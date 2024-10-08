/**
 * This page is not for Server Component, but for Server Actions
 * Only execute on server side，no worry about CSRF attack
 */
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

// this action only triggered on SignInButton Component's form element
export async function signInAction() {
  // 成功登入 Google 後，導向 "/account" 頁面
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();

  // Only authorized member can manipulate the database
  if (!session) {
    throw new Error("You must be logged in");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };
  await updateGuest(session.user.guestId, updateData);
  // after data updated, revalidate the path of the page
  revalidatePath("/account/profile");
}

export async function createBookingAction(bookingData, formData) {
  // Only authorized member can manipulate the database
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };

  await createBooking(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBookingAction(bookingId) {
  // use for testing useOptimistic
  // await new Promise((res) => setTimeout(res, 5000));

  // Only authorized member can manipulate the database
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  // Prevent hacker change the database
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You're not allow to delete this booking");
  }

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  // 2) Authorization,  Prevent hacker update the database
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You're not allow to update this booking");
  }

  // 3) Update data
  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  await updateBooking(bookingId, updatedData);

  // 5) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 6) Redirecting
  redirect("/account/reservations");
}
