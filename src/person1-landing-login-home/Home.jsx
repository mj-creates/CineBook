import { useState, useEffect } from 'react';
import './Home.css';

function getCurrentShowTime(hour) {
  if (hour >= 9 && hour < 13) return "Matinee";
  if (hour >= 13 && hour < 17) return "First Show";
  if (hour >= 17 && hour < 21) return "Second Show";
  return "No Shows Available";
}

const movies = [
  { id: 1, title: "The Batman", language: "English", color: '#ffe08a', emoji: '🦇', price: 220, seatsLeft: 14 },
  { id: 2, title: "Kalki Returns", language: "Telugu", color: '#ffb3b3', emoji: '🌌', price: 180, seatsLeft: 6 },
  { id: 3, title: "Dil se Dosti", language: "Hindi", color: '#b3d9ff', emoji: '💞', price: 200, seatsLeft: 20 },
];

function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const showtime = getCurrentShowTime(now.getHours());
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleMovieClick = (movie) => {
    alert(`You selected ${movie.title} (${movie.language}) for ${showtime}`);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Cine<span>Book</span></h1>
        <div className="clock-box">
          <div className="clock-time">{timeString}</div>
          <div className="clock-showtime">{showtime}</div>
        </div>
      </div>

      <p className="home-subtitle">Now showing — pick your movie and grab a seat 🍿</p>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            style={{ backgroundColor: movie.color }}
            onClick={() => handleMovieClick(movie)}
          >
            <div className="movie-emoji">{movie.emoji}</div>
            <h2>{movie.title}</h2>
            <span className="movie-lang">{movie.language}</span>

            <div className="movie-meta">
              <div className="meta-row">
                <span>🎟️ {showtime}</span>
                <span>💺 {movie.seatsLeft} left</span>
              </div>
              <div className="movie-price">₹{movie.price}</div>
            </div>

            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;