import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingHistory.css";

function BookingHistory() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const savedBookings =
      JSON.parse(
        localStorage.getItem("cinebook-booking-history")
      ) || [];

    setBookings(savedBookings);

  }, []);

  function clearHistory() {

    const confirmClear =
      window.confirm(
        "Are you sure you want to clear your booking history?"
      );

    if (!confirmClear) {
      return;
    }

    localStorage.removeItem(
      "cinebook-booking-history"
    );

    setBookings([]);

  }

  return (

    <div className="history-page">

      <div className="history-container">

        <div className="history-header">

          <h1>
            Booking History
          </h1>

          <button
            className="home-button"
            onClick={() => navigate("/home")}
          >
            Home
          </button>

        </div>

        {bookings.length === 0 ? (

          <div className="empty-history">

            <div className="empty-icon">
              🎟️
            </div>

            <h2>
              No Bookings Yet
            </h2>

            <p>
              Your completed movie bookings will appear here.
            </p>

            <button
              onClick={() => navigate("/home")}
            >
              Book a Movie
            </button>

          </div>

        ) : (

          <>

            <div className="booking-count">
              {bookings.length} Booking
              {bookings.length !== 1 ? "s" : ""}
            </div>

            <div className="booking-list">

              {bookings.map((booking) => (

                <div
                  className="booking-card"
                  key={booking.id}
                >

                  <div className="booking-top">

                    <h2>
                      {booking.movieTitle}
                    </h2>

                    <span className="booking-status">
                      ✓ Confirmed
                    </span>

                  </div>

                  <div className="booking-info">

                    <div>
                      <span>
                        Showtime
                      </span>

                      <strong>
                        {booking.showtime}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Seats
                      </span>

                      <strong>
                        {booking.seats.join(", ")}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Tickets
                      </span>

                      <strong>
                        {booking.seats.length}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Amount
                      </span>

                      <strong>
                        ₹{booking.amount}
                      </strong>
                    </div>

                  </div>

                  <div className="booking-footer">

                    <span>
                      Booking ID: {booking.id}
                    </span>

                    <span>
                      {booking.date}
                    </span>

                  </div>

                </div>

              ))}

            </div>

            <button
              className="clear-history-button"
              onClick={clearHistory}
            >
              Clear Booking History
            </button>

          </>

        )}

      </div>

    </div>

  );
}

export default BookingHistory;