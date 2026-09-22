import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import SeatGrid from "./SeatGrid";

import { useBooking } from "../context/BookingContext";

import "./SeatSelection.css";

function SeatSelection() {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedSeats,
    startTimer,
    timeLeft,
    formatTime
  } = useBooking();


  // Temporary demo movie.
  // Later Person 1's Home page will provide
  // the actual movie and showtime.

  const movie =
    location.state?.movie || {
      id: "demo-movie",
      title: "Demo Movie"
    };


  const showtime =
    location.state?.showtime || "Matinee";


  // Continue button
  function handleContinue() {

  if (selectedSeats.length === 0) {

    alert("Please select at least one seat.");

    return;
  }

  // Start the 2-minute timer
  startTimer();

  // Go to Payment page
  navigate("/payment", {
    state: {
      movie,
      showtime
    }
  });
}

  return (

    <div className="seat-page">

      {/* Page title */}

      <h1>
        Select Your Seats
      </h1>


      {/* Movie name */}

      <h2>
        {movie.title}
      </h2>


      {/* Showtime */}

      <p>
        Showtime: {showtime}
      </p>


      {/* Screen */}

      <div className="screen">
        SCREEN
      </div>


      {/* 20 seats */}

      <SeatGrid
        movieId={movie.id}
        showtime={showtime}
      />


      {/* Seat legend */}

      <div className="seat-legend">

        <span>
          🟨 Available
        </span>

        <span>
          🟩 Selected
        </span>

        <span>
          ⬜ Booked
        </span>

      </div>


      {/* Selected seats */}

      <div className="selected-section">

        <h3>
          Selected Seats
        </h3>


        {selectedSeats.length === 0 ? (

          <p>
            No seats selected
          </p>

        ) : (

          <p>
            {selectedSeats.join(", ")}
          </p>

        )}

      </div>


      {/* Timer */}

      <div className="timer">

        Time remaining:{" "}

        <strong>
          {formatTime()}
        </strong>

      </div>


      {/* Continue button */}

      <button
        className="continue-button"
        onClick={handleContinue}
      >
        Continue
      </button>


    </div>

  );

}


export default SeatSelection;