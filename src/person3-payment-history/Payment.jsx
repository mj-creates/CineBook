import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedSeats,
    timeLeft,
    timerRunning,
    confirmBooking,
    formatTime
  } = useBooking();

  const movie = location.state?.movie || {
    id: "demo-movie",
    title: "Demo Movie"
  };

  const showtime = location.state?.showtime || "Matinee";

  const [paymentDone, setPaymentDone] = useState(false);

  const pricePerSeat = 200;
  const totalAmount = selectedSeats.length * pricePerSeat;

  


  function handlePayment() {
    if (selectedSeats.length === 0) {
      alert("No seats selected.");
      return;
    }

    if (!timerRunning || timeLeft <= 0) {
      alert("Your reservation time has expired. Please select the seats again.");
      return;
    }

    
    const booking = {
      id: `CB-${Date.now()}`,
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: showtime,
      seats: [...selectedSeats],
      amount: totalAmount,
      date: new Date().toLocaleString(),
    };

    const previousBookings =
      JSON.parse(
        localStorage.getItem("cinebook-booking-history")
      ) || [];

    localStorage.setItem(
      "cinebook-booking-history",
      JSON.stringify([
        booking,
        ...previousBookings
      ])
    );

    
    confirmBooking(
      movie.id,
      showtime
    );

    setPaymentDone(true);
  }

  if (paymentDone) {
    return (
      <div className="payment-page">
        <div className="payment-success">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Booking Confirmed!
          </h1>

          <p className="success-message">
            Your movie tickets have been booked successfully.
          </p>

          <div className="ticket-details">

            <h2>
              {movie.title}
            </h2>

            <p>
              <strong>Showtime:</strong>{" "}
              {showtime}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {selectedSeats.length === 0
                ? "Confirmed"
                : selectedSeats.join(", ")}
            </p>

            <p>
              <strong>Amount:</strong>{" "}
              ₹{totalAmount}
            </p>

          </div>

          <div className="success-buttons">

            <button
              onClick={() =>
                navigate("/booking-history")
              }
            >
              View Booking History
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                navigate("/home")
              }
            >
              Back to Home
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">

      <div className="payment-card">

        <h1>
          Payment
        </h1>

        <p className="payment-subtitle">
          Complete your payment before the timer expires.
        </p>

        

        <div className="payment-timer">

          <span>
            Time Remaining
          </span>

          <strong>
            {formatTime()}
          </strong>

        </div>

        

        <div className="booking-summary">

          <h2>
            {movie.title}
          </h2>

          <p>
            Showtime: <strong>{showtime}</strong>
          </p>

          <p>
            Seats:{" "}
            <strong>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </strong>
          </p>

        </div>

        

        <div className="price-section">

          <div>
            <span>
              Tickets
            </span>

            <span>
              {selectedSeats.length} × ₹{pricePerSeat}
            </span>
          </div>

          <div className="total-row">

            <strong>
              Total
            </strong>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>

        </div>

        

        <div className="payment-method">

          <h3>
            Payment Method
          </h3>

          <div className="payment-option">
            💳 Credit / Debit Card
          </div>

          <div className="payment-option">
            📱 UPI
          </div>

          <div className="payment-option">
            💰 Wallet
          </div>

        </div>

        

        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={
            selectedSeats.length === 0 ||
            !timerRunning ||
            timeLeft <= 0
          }
        >
          Pay ₹{totalAmount}
        </button>

        <button
          className="cancel-button"
          onClick={() =>
            navigate("/seat-selection", {
              state: {
                movie,
                showtime
              }
            })
          }
        >
          Back to Seats
        </button>

      </div>

    </div>
  );
}

export default Payment;