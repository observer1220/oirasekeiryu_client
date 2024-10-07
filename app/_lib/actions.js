/**
 * This page is not for Server Component, but for Server Actions
 * Only execute on server side，no worry about CSRF attack
 */
"use server";

import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

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
}
