import React from 'react';

function OnboardingScreen({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-emerald-800 font-bold text-2xl">SMB</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Welcome to SMB Global Market
        </h1>
        <p className="text-gray-500 text-sm max-w-xs">
          Discover quality products from trusted vendors around the world.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          onClick={() => onNavigate && onNavigate('register')}
          className="w-full py-3.5 bg-emerald-800 text-white font-medium rounded-xl hover:bg-emerald-900 transition"
        >
          Get Started
        </button>
        <button
          onClick={() => onNavigate && onNavigate('login')}
          className="w-full py-3.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
        >
          I Already Have An Account
        </button>
      </div>
    </div>
  );
}

export default OnboardingScreen;
