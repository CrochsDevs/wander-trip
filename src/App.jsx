import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Guide from './pages/Guide';
import Budget from './pages/TravelTips/Budget';
import Safety from './pages/TravelTips/Safety'; 
import Packing from './pages/TravelTips/Packing'; 
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<Navigate to="/home" />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/guide" element={<Guide />} />
        
        <Route path="/budget" element={<Budget />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/packing" element={<Packing />} />

        <Route path="/about" element={<About />} />

      

      </Routes>
    </Router>
  );
}

export default App;