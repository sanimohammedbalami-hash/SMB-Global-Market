import React, { useState, useEffect } from 'react';
import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import Register from './pages/Register';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'onboarding' && <OnboardingScreen onNavigate={handleNavigate} />}
      {currentScreen === 'register' && <Register onNavigate={handleNavigate} />}
      {currentScreen === 'login' && (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Login Screen</h2>
            <button
              onClick={() => handleNavigate('onboarding')}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg"
            >
              Back to Onboarding
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
