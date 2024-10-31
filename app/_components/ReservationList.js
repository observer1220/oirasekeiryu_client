"use client";

import { useOptimistic } from "react";
import ReservationCard from "@/app/_components/ReservationCard";
import { deleteBookingAction } from "../_lib/actions";

function ReservationList({ bookings }) {
  // Assume the delete API will be success, so just remove it will user click the delete button
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
      // Create will be like...
      // return [...curBookings, newBookingId]
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBookingAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
