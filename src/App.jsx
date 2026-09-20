import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './person1-landing-login-home/Landing';
import Login from './person1-landing-login-home/Login';
import Home from './person1-landing-login-home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seats/:movieId" element={<div>Seat selection coming soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;