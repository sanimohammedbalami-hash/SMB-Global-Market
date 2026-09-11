import React, { useState, useEffect } from 'react';
import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [lang, setLang] = useState('en');

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
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}
      {currentScreen === 'register' && (
        <Register onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}
      {currentScreen === 'login' && (
        <Login onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}
    </div>
  );
}

export default App;
