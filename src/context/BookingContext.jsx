import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {

  // Seats that are permanently booked
  const [bookedSeats, setBookedSeats] = useState(() => {

    const saved =
      localStorage.getItem("cinebook-booked-seats");

    return saved
      ? JSON.parse(saved)
      : {};
  });


  // Seats currently selected by the user
  const [selectedSeats, setSelectedSeats] = useState([]);


  // 2-minute timer
  const [timeLeft, setTimeLeft] = useState(120);


  // Is timer running?
  const [timerRunning, setTimerRunning] =
    useState(false);


  // Save booked seats
  useEffect(() => {

    localStorage.setItem(
      "cinebook-booked-seats",
      JSON.stringify(bookedSeats)
    );

  }, [bookedSeats]);


  // TIMER
  useEffect(() => {

    if (!timerRunning) {
      return;
    }


    if (timeLeft <= 0) {

      setTimerRunning(false);

      // Release selected seats
      setSelectedSeats([]);

      alert(
        "Your 2-minute reservation time has expired. The seats have been released."
      );

      return;
    }


    const timer = setInterval(() => {

      setTimeLeft(
        previousTime => previousTime - 1
      );

    }, 1000);


    return () => clearInterval(timer);

  }, [timerRunning, timeLeft]);


  // Create unique key for movie + showtime
  function getShowKey(movieId, showtime) {

    return `${movieId}_${showtime}`;
  }


  // Get booked seats for a particular show
  function getBookedSeats(movieId, showtime) {

    const key =
      getShowKey(movieId, showtime);

    return bookedSeats[key] || [];
  }


  // SELECT / DESELECT SEAT
  function toggleSeat(
    seatNumber,
    movieId,
    showtime
  ) {

    const alreadyBooked =
      getBookedSeats(movieId, showtime);


    // Do nothing if seat is already booked
    if (alreadyBooked.includes(seatNumber)) {
      return;
    }


    setSelectedSeats(previousSeats => {

      // Deselect
      if (previousSeats.includes(seatNumber)) {

        return previousSeats.filter(
          seat => seat !== seatNumber
        );

      }


      // Select
      return [
        ...previousSeats,
        seatNumber
      ];

    });

  }


  // START TIMER
  function startTimer() {

    setTimeLeft(120);

    setTimerRunning(true);

  }


  // STOP TIMER
  function stopTimer() {

    setTimerRunning(false);

  }


  // PAYMENT SUCCESS
  function confirmBooking(
    movieId,
    showtime
  ) {

    if (selectedSeats.length === 0) {
      return;
    }


    const key =
      getShowKey(movieId, showtime);


    setBookedSeats(previousBooked => {

      const existingSeats =
        previousBooked[key] || [];


      return {

        ...previousBooked,

        [key]: [
          ...existingSeats,
          ...selectedSeats
        ]

      };

    });


    // Stop timer
    setTimerRunning(false);


    // Clear selection
    setSelectedSeats([]);

  }


  // Format timer
  function formatTime() {

    const minutes =
      Math.floor(timeLeft / 60);

    const seconds =
      timeLeft % 60;


    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }


  const value = {

    bookedSeats,

    selectedSeats,

    timeLeft,

    timerRunning,

    getBookedSeats,

    toggleSeat,

    startTimer,

    stopTimer,

    confirmBooking,

    formatTime

  };


  return (

    <BookingContext.Provider value={value}>

      {children}

    </BookingContext.Provider>

  );
}