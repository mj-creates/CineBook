import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./person1-landing-login-home/Landing";
import Login from "./person1-landing-login-home/Login";
import Home from "./person1-landing-login-home/Home";

import SeatSelection from "./person2-seat-selection/SeatSelection";

import Payment from "./person3-payment-history/Payment";
import BookingHistory from "./person3-payment-history/BookingHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Person 1 - Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Person 1 - Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Person 1 - Home Page */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* Person 2 - Seat Selection */}
        <Route
          path="/seat-selection"
          element={<SeatSelection />}
        />

        {/* Person 3 - Payment */}
        <Route
          path="/payment"
          element={<Payment />}
        />

        {/* Person 3 - Booking History */}
        <Route
          path="/booking-history"
          element={<BookingHistory />}
        />

        {/* Existing seats route */}
        <Route
          path="/seats/:movieId"
          element={
            <div>
              Seat selection coming soon
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;