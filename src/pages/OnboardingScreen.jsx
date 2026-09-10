import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 text-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center p-4 shadow-inner">
          <img src="/logo.png" alt="SMB Logo" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="text-emerald-700 font-bold text-3xl">SMB</div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SMB Global Market</h1>
          <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
            Discover quality products from trusted vendors around the world.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 mb-6">
        <button
          onClick={() => navigate('/register')}
          className="w-full bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-md active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl border border-gray-200 active:scale-95 transition-transform"
        >
          I Already Have An Account
        </button>
      </div>
    </div>
  );
}
