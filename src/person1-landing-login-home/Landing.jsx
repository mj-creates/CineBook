import './Landing.css';
import { useNavigate } from 'react-router-dom';
function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="shape-yellow-small"></div>
      <div className="shape-purple-small"></div>
      <div className="landing-card">
        <div className="shape-pink"></div>
        <div className="shape-mint"></div>
        <h1>Cine<span>Book</span></h1>
        <p>Book your movie tickets in seconds</p>
        <button onClick={() => navigate('/Home')} className="get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;