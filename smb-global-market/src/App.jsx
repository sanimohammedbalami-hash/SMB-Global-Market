import React, { useState, useEffect } from 'react';
import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState({ name: 'Customer' });

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleNavigate = (screen, userData = null) => {
    if (userData) {
      setUser(userData);
    }
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
      {currentScreen === 'home' && (
        <Home onNavigate={handleNavigate} lang={lang} setLang={setLang} user={user} />
      )}
    </div>
  );
}

export default App;
