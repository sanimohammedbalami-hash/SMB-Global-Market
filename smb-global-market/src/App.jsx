import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
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
  const [lang, setLang] = useState('ha');
  const [step, setStep] = useState('splash'); 
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [onboardingIndex, setOnboardingIndex] = useState(0);

  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => {
        const savedAuth = localStorage.getItem('smb_authenticated');
        if (savedAuth === 'true') {
          setStep('app');
        } else {
          setStep('onboarding');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const onboardingSlides = [
    { title: 'Barka da zuwa SMB Global Market', titleEn: 'Welcome to SMB Global Market', desc: 'Babban kasuwar e-commerce na duniya.', descEn: 'Your premier global marketplace.', icon: '🛍️' },
    { title: 'Isar da Sauri da Tabbaci', titleEn: 'Fast & Secure Delivery', desc: 'Muna isar da kayanku cikin amintacciyar hanya.', descEn: 'We deliver your products safely.', icon: '🚚' },
    { title: 'Hanyoyin Biya Masu Sauƙi', titleEn: 'Easy Payment', desc: 'Yi amfani da hanyoyin biya daban-daban.', descEn: 'Enjoy multiple payment options.', icon: '💳' }
  ];

  const handleLogin = () => {
    localStorage.setItem('smb_authenticated', 'true');
    setStep('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('smb_authenticated');
    setStep('auth');
  };

  const navigateTo = (page, product = null) => {
    if (product) setSelectedProduct(product);
    setCurrentPage(page);
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
          <button onClick={() => setLang(lang === 'ha' ? 'en' : 'ha')} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">
            {lang === 'ha' ? '🇳🇬 HA' : '🇬🇧 EN'}
          </button>
          <button onClick={() => setStep('auth')} className="text-xs text-gray-400 font-bold">
            {lang === 'ha' ? 'Tsallake' : 'Skip'}
          </button>
        </div>

        <div className="my-auto text-center space-y-4">
          <div className="text-7xl mb-6 py-8 bg-emerald-50 rounded-3xl inline-block px-10 border border-emerald-100">{slide.icon}</div>
          <h2 className="text-xl font-black text-gray-800">{lang === 'ha' ? slide.title : slide.titleEn}</h2>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">{lang === 'ha' ? slide.desc : slide.descEn}</p>
        </div>

        <div>
          {onboardingIndex < onboardingSlides.length - 1 ? (
            <button onClick={() => setOnboardingIndex(onboardingIndex + 1)} className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs">
              {lang === 'ha' ? 'Cigaba ›' : 'Next ›'}
            </button>
          ) : (
            <button onClick={() => setStep('auth')} className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs">
              {lang === 'ha' ? 'Fara Amfani ›' : 'Get Started ›'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. AUTH SCREEN
  if (step === 'auth') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-6 max-w-md mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4 text-center">
          <h2 className="text-lg font-black text-gray-800">{lang === 'ha' ? 'Shiga SMB Global Market' : 'Sign in'}</h2>
          <button onClick={handleLogin} className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs">
            {lang === 'ha' ? 'Shiga (Login)' : 'Sign In'}
          </button>
        </div>
      </div>
    );
  }

  // 4. ALL APPLICATION PAGES
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl">
      {currentPage === 'home' && <HomePage onNavigate={navigateTo} lang={lang} setLang={setLang} />}
      {currentPage === 'categories' && <CategoriesPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'cart' && <CartPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'favorites' && <FavoritesPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'account' && <AccountPage onNavigate={navigateTo} onLogout={handleLogout} lang={lang} />}
      {currentPage === 'details' && <ProductDetailsPage product={selectedProduct} onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'checkout' && <CheckoutPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'order-success' && <OrderSuccessPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'orders' && <OrdersPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'track' && <TrackOrderPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'edit-profile' && <EditProfilePage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'address' && <AddressPage onNavigate={navigateTo} lang={lang} />}
      {currentPage === 'customer-service' && <CustomerServicePage onNavigate={navigateTo} lang={lang} />}
    </div>
  );
}
