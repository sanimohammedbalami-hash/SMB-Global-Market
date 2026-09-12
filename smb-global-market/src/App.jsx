import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import VendorLoginPage from './pages/VendorLoginPage';
import VendorRegistrationPage from './pages/VendorRegistrationPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState('ha');
  const [cartCount, setCartCount] = useState(2);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} lang={lang} setLang={setLang} cartCount={cartCount} />;
      case 'categories':
        return <CategoriesPage onNavigate={setCurrentPage} onBack={() => setCurrentPage('home')} lang={lang} />;
      case 'vendor-login':
        return <VendorLoginPage onNavigate={setCurrentPage} lang={lang} />;
      case 'vendor-register':
        return <VendorRegistrationPage onNavigate={setCurrentPage} lang={lang} />;
      default:
        return <HomePage onNavigate={setCurrentPage} lang={lang} setLang={setLang} cartCount={cartCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {renderPage()}
    </div>
  );
}

export default App;
