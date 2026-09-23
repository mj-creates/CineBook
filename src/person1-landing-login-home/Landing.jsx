import './Landing.css';
import { useNavigate } from 'react-router-dom';
function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="landing-card">
        <h1>Cine<span>Book</span></h1>
        <p>Book your movie tickets in seconds</p>
        <button onClick={() => navigate('/login')} className="get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;