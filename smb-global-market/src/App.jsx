import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import AccountPage from './pages/AccountPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import TrackOrderPage from './pages/TrackOrderPage';
import EditProfilePage from './pages/EditProfilePage';
import AddressPage from './pages/AddressPage';
import CustomerServicePage from './pages/CustomerServicePage';

export default function App() {
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(() => localStorage.getItem('smb_step') || 'splash');
  
  // Maido da shafin karshe idan an yi refresh
  const [pageHistory, setPageHistory] = useState(() => {
    const saved = localStorage.getItem('smb_page');
    return saved ? [saved] : ['home'];
  });
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userPhone, setUserPhone] = useState('09025777951');
  const [onboardingIndex, setOnboardingIndex] = useState(0);

  const currentPage = pageHistory[pageHistory.length - 1] || 'home';

  // Kiyaye shafi lokacin Refresh
  useEffect(() => {
    localStorage.setItem('smb_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('smb_step', step);
  }, [step]);

  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => {
        setStep('onboarding');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const onboardingSlides = [
    { 
      title: 'Welcome to SMB Global Market', 
      titleHa: 'Barka da zuwa SMB Global Market', 
      desc: 'Your premier global marketplace connecting you with quality products.', 
      descHa: 'Babban kasuwar e-commerce na duniya wanda ke haɗa ku da manyan kayayyaki.', 
      icon: '🛍️' 
    },
    { 
      title: 'Fast & Secure Delivery', 
      titleHa: 'Isar da Sauri da Tabbaci', 
      desc: 'We deliver your packages safely and directly to your doorstep.', 
      descHa: 'Muna isar da kayanku cikin amintacciyar hanyar zuwa ƙofarta.', 
      icon: '🚚' 
    },
    { 
      title: 'Easy & Flexible Payment', 
      titleHa: 'Hanyoyin Biya Masu Sauƙi', 
      desc: 'Enjoy multiple seamless payment options at your convenience.', 
      descHa: 'Yi amfani da hanyoyin biya daban-daban cikin sauƙi.', 
      icon: '💳' 
    }
  ];

  const handleLogin = (phone) => {
    setUserPhone(phone || '09025777951');
    setStep('app');
    setPageHistory(['home']);
  };

  const handleRegister = (phone) => {
    setUserPhone(phone || '09025777951');
    setStep('app');
    setPageHistory(['home']);
  };

  const handleLogout = () => {
    localStorage.removeItem('smb_step');
    localStorage.removeItem('smb_page');
    setStep('login');
    setPageHistory(['home']);
  };

  const navigateTo = (page, product = null) => {
    if (product) setSelectedProduct(product);
    setPageHistory((prev) => [...prev, page]);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      setPageHistory((prev) => prev.slice(0, prev.length - 1));
    } else {
      setPageHistory(['home']);
    }
    window.scrollTo(0, 0);
  };

  // 1. SPLASH SCREEN
  if (step === 'splash') {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-white p-6 relative">
        <div className="w-24 h-24 bg-emerald-800 rounded-3xl flex items-center justify-center text-5xl shadow-2xl mb-4 animate-bounce">
          🛒
        </div>
        <h1 className="text-2xl font-black text-emerald-100">SMB GLOBAL MARKET</h1>
        <p className="text-xs text-emerald-300 mt-1">Connecting Quality & Value</p>
      </div>
    );
  }

  // 2. ONBOARDING SCREEN
  if (step === 'onboarding') {
    const slide = onboardingSlides[onboardingIndex];
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between p-6 max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <button onClick={() => setLang(lang === 'en' ? 'ha' : 'en')} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">
            {lang === 'en' ? '🇬🇧 EN' : '🇳🇬 HA'}
          </button>
          <button onClick={() => setStep('login')} className="text-xs text-gray-400 font-bold">
            {lang === 'en' ? 'Skip' : 'Tsallake'}
          </button>
        </div>

        <div className="my-auto text-center space-y-4">
          <div className="text-7xl mb-6 py-8 bg-emerald-50 rounded-3xl inline-block px-10 border border-emerald-100">{slide.icon}</div>
          <h2 className="text-xl font-black text-gray-800">{lang === 'en' ? slide.title : slide.titleHa}</h2>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">{lang === 'en' ? slide.desc : slide.descHa}</p>
        </div>

        <div>
          {onboardingIndex < onboardingSlides.length - 1 ? (
            <button onClick={() => setOnboardingIndex(onboardingIndex + 1)} className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg">
              {lang === 'en' ? 'Next ›' : 'Cigaba ›'}
            </button>
          ) : (
            <button onClick={() => setStep('login')} className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg">
              {lang === 'en' ? 'Get Started ›' : 'Shiga / Rijista ›'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. LOGIN PAGE
  if (step === 'login') {
    return <LoginPage onLogin={handleLogin} onGoToRegister={() => setStep('register')} lang={lang} />;
  }

  // 4. REGISTER PAGE
  if (step === 'register') {
    return <RegisterPage onRegister={handleRegister} onGoToLogin={() => setStep('login')} lang={lang} />;
  }

  // 5. MAIN APPLICATION
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl">
      {currentPage === 'home' && <HomePage onNavigate={navigateTo} userPhone={userPhone} lang={lang} setLang={setLang} />}
      {currentPage === 'categories' && <CategoriesPage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'cart' && <CartPage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'favorites' && <FavoritesPage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'account' && <AccountPage onNavigate={navigateTo} onBack={goBack} onLogout={handleLogout} userPhone={userPhone} lang={lang} />}
      {currentPage === 'details' && <ProductDetailsPage product={selectedProduct} onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'checkout' && <CheckoutPage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'order-success' && <OrderSuccessPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'orders' && <OrdersPage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'track' && <TrackOrderPage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'edit-profile' && <EditProfilePage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'address' && <AddressPage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
      {currentPage === 'customer-service' && <CustomerServicePage onNavigate={navigateTo} onBack={goBack} lang={lang} />}
    </div>
  );
}
