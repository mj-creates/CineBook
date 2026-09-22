import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import './Home.css';

function getCurrentShowTime(hour) {
  if (hour >= 9 && hour < 12) return "Morning Show";
  if (hour >= 12 && hour < 15) return "Matinee";
  if (hour >= 15 && hour < 18) return "First Show";
  if (hour >= 18 && hour < 21) return "Second Show";
  if (hour >= 21 && hour < 24) return "Night Show";
  return "No Shows Available";
}

const movies = [
  {
    id: 1,
    title: "The Batman",
    language: "English",
    emoji: "🦇",
    price: 220
  },
  {
    id: 2,
    title: "Kalki Returns",
    language: "Telugu",
    emoji: "🌌",
    price: 180
  },
  {
    id: 3,
    title: "Dil se Dosti",
    language: "Hindi",
    emoji: "💞",
    price: 200
  },
  {
    id: 4,
    title: "Inception",
    language: "English",
    emoji: "🌀",
    price: 250
  },
  {
    id: 5,
    title: "Spider-Man",
    language: "English",
    emoji: "🕷️",
    price: 210
  },
  {
    id: 6,
    title: "Leo",
    language: "Tamil",
    emoji: "🦁",
    price: 190
  }
];

function Home() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  
  const { getBookedSeats } = useBooking();

  const [showAccount, setShowAccount] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("cinebookUser");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.name) {
          setUserName(user.name);
        }
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  const showtime = getCurrentShowTime(now.getHours());
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  function handleBookNow(movie) {
    if (showtime === "No Shows Available") {
      alert("No shows are currently available.");
      return;
    }
    navigate("/seat-selection", { state: { movie, showtime } });
  }

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Cine<span>Book</span></h1>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="header-actions">
          <div className="clock-box">
            <div className="clock-time">{timeString}</div>
            <div className="clock-showtime">{showtime}</div>
          </div>
          <div className="user-controls">
            <div className="account-wrapper">
              <button 
                className="nav-btn account-btn" 
                onClick={() => setShowAccount(!showAccount)}
              >
                Account
              </button>
              {showAccount && (
                <div className="account-dropdown">
                  <p>This account belongs to:</p>
                  <strong>{userName}</strong>
                </div>
              )}
            </div>
            <button className="nav-btn logout-btn" onClick={() => navigate('/login')}>Logout</button>
          </div>
        </div>
      </header>

      <p className="home-subtitle">
        Now showing — pick your movie and grab a seat 🍿
      </p>

      <main className="movie-grid">
        {filteredMovies.map((movie) => {
          const bookedCount = getBookedSeats(movie.id, showtime).length;
          const seatsLeft = 20 - bookedCount;

          return (
            <article key={movie.id} className="movie-card">
              <div className="movie-emoji">{movie.emoji}</div>
              <h2>{movie.title}</h2>
              <span className="movie-lang">{movie.language}</span>
              
              <div className="movie-meta">
                <div className="meta-row">
                  <span>🎟️ {showtime}</span>
                  <span>💺 {seatsLeft} left</span>
                </div>
                <div className="movie-price">₹{movie.price}</div>
              </div>

              <button className="book-btn" onClick={() => handleBookNow(movie)}>
                Book Now
              </button>
            </article>
          );
        })}
      </main>
    </div>
  );
}

export default Home;