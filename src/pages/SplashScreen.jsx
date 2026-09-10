import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-brand-green flex flex-col items-center justify-center text-white z-50">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg p-3">
          <img src="/logo.png" alt="SMB Logo" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="text-brand-green font-bold text-2xl">SMB</div>
        </div>
        <h1 className="text-2xl font-bold tracking-wider">SMB GLOBAL MARKET</h1>
        <p className="text-xs text-green-100 font-light tracking-widest">Shop Smarter • Grow Together</p>
      </div>
      <div className="absolute bottom-12 flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        <span className="text-xs text-green-100">Loading...</span>
      </div>
    </div>
  );
}
