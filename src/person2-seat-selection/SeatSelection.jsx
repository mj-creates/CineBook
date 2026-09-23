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


  
  
  

  const movie =
    location.state?.movie || {
      id: "demo-movie",
      title: "Demo Movie"
    };


  const showtime =
    location.state?.showtime || "Matinee";


  
  function handleContinue() {

  if (selectedSeats.length === 0) {

    alert("Please select at least one seat.");

    return;
  }

  
  startTimer();

  
  navigate("/payment", {
    state: {
      movie,
      showtime
    }
  });
}

  return (

    <div className="seat-page">

      

      <h1>
        Select Your Seats
      </h1>


      

      <h2>
        {movie.title}
      </h2>


      

      <p>
        Showtime: {showtime}
      </p>


      

      <div className="screen">
        SCREEN
      </div>


      

      <SeatGrid
        movieId={movie.id}
        showtime={showtime}
      />


      

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


      

      <div className="timer">

        Time remaining:{" "}

        <strong>
          {formatTime()}
        </strong>

      </div>


      

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