import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/customer/Home';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}
