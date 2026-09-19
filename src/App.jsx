import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './person1-landing-login-home/Landing';
import Home from './person1-landing-login-home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;