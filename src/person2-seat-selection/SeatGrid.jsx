import React from "react";

import Seat from "./Seat";

import {
  useBooking
} from "../context/BookingContext";


function SeatGrid({
  movieId,
  showtime
}) {

  const {
    selectedSeats,
    getBookedSeats,
    toggleSeat
  } = useBooking();


  const bookedSeats =
    getBookedSeats(
      movieId,
      showtime
    );


  
  const seats = Array.from(
    { length: 20 },
    (_, index) => index + 1
  );


  return (

    <div className="seat-grid">

      {seats.map(seatNumber => (

        <Seat
          key={seatNumber}

          seatNumber={seatNumber}

          isBooked={
            bookedSeats.includes(
              seatNumber
            )
          }

          isSelected={
            selectedSeats.includes(
              seatNumber
            )
          }

          onClick={() =>
            toggleSeat(
              seatNumber,
              movieId,
              showtime
            )
          }

        />

      ))}

    </div>

  );

}

export default SeatGrid;