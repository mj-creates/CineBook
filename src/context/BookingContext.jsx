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

  
  const [bookedSeats, setBookedSeats] = useState(() => {

    const saved =
      localStorage.getItem("cinebook-booked-seats");

    return saved
      ? JSON.parse(saved)
      : {};
  });


  
  const [selectedSeats, setSelectedSeats] = useState([]);


  
  const [timeLeft, setTimeLeft] = useState(120);


  
  const [timerRunning, setTimerRunning] =
    useState(false);


  
  useEffect(() => {

    localStorage.setItem(
      "cinebook-booked-seats",
      JSON.stringify(bookedSeats)
    );

  }, [bookedSeats]);


  
  useEffect(() => {

    if (!timerRunning) {
      return;
    }


    if (timeLeft <= 0) {

      setTimerRunning(false);

      
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


  
  function getShowKey(movieId, showtime) {

    return `${movieId}_${showtime}`;
  }


  
  function getBookedSeats(movieId, showtime) {

    const key =
      getShowKey(movieId, showtime);

    return bookedSeats[key] || [];
  }


  
  function toggleSeat(
    seatNumber,
    movieId,
    showtime
  ) {

    const alreadyBooked =
      getBookedSeats(movieId, showtime);


    
    if (alreadyBooked.includes(seatNumber)) {
      return;
    }


    setSelectedSeats(previousSeats => {

      
      if (previousSeats.includes(seatNumber)) {

        return previousSeats.filter(
          seat => seat !== seatNumber
        );

      }


      
      return [
        ...previousSeats,
        seatNumber
      ];

    });

  }


  
  function startTimer() {

    setTimeLeft(120);

    setTimerRunning(true);

  }


  
  function stopTimer() {

    setTimerRunning(false);

  }


  
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


    
    setTimerRunning(false);


    
    setSelectedSeats([]);

  }


  
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