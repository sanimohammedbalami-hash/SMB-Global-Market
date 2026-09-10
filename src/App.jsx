import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/customer/Home';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/" element={<><Header /><Home /><BottomNav /></>} />
        </Routes>
      </div>
    </Router>
  );
}
