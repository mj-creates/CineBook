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

        
        <Route
          path="/"
          element={<Landing />}
        />

        
        <Route
          path="/login"
          element={<Login />}
        />

        
        <Route
          path="/home"
          element={<Home />}
        />

        
        <Route
          path="/seat-selection"
          element={<SeatSelection />}
        />

        
        <Route
          path="/payment"
          element={<Payment />}
        />

        
        <Route
          path="/booking-history"
          element={<BookingHistory />}
        />

        


      </Routes>
    </BrowserRouter>
  );
}

export default App;