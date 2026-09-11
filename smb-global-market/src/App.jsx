import React, { useState, useEffect } from 'react';
import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrdersPage from './pages/OrdersPage';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import TrackOrderPage from './pages/TrackOrderPage';
import EditProfilePage from './pages/EditProfilePage';
import AddressPage from './pages/AddressPage';
import NotificationPage from './pages/NotificationPage';
import CustomerServicePage from './pages/CustomerServicePage';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState({ name: 'Sani Achibu' });

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
      setUser((prev) => ({ ...prev, ...userData }));
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'register':
        return <Register onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'login':
        return <Login onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'categories':
        return <CategoriesPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} lang={lang} setLang={setLang} user={user} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} lang={lang} setLang={setLang} user={user} />;
      case 'product_details':
        return <ProductDetailsPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'orders':
        return <OrdersPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'search':
        return <SearchPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'order_success':
        return <OrderSuccessPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'order_details':
        return <OrderDetailsPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'track_order':
        return <TrackOrderPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'edit_profile':
        return <EditProfilePage onNavigate={handleNavigate} lang={lang} setLang={setLang} user={user} />;
      case 'addresses':
        return <AddressPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'notifications':
        return <NotificationPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'customer_service':
        return <CustomerServicePage onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} lang={lang} setLang={setLang} user={user} />;
    }
  };

  const showBottomNav = ['home', 'categories', 'cart', 'account'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-50 relative pb-16">
      {renderScreen()}

      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50">
          <button onClick={() => handleNavigate('home')} className={`flex flex-col items-center ${currentScreen === 'home' ? 'text-emerald-800' : 'text-gray-500'}`}>
            <span className="text-lg">🏠</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => handleNavigate('categories')} className={`flex flex-col items-center ${currentScreen === 'categories' ? 'text-emerald-800' : 'text-gray-500'}`}>
            <span className="text-lg">🗂️</span>
            <span className="text-[10px] font-medium">Categories</span>
          </button>
          <button onClick={() => handleNavigate('cart')} className={`flex flex-col items-center relative ${currentScreen === 'cart' ? 'text-emerald-800' : 'text-gray-500'}`}>
            <span className="text-lg">🛒</span>
            <span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">2</span>
            <span className="text-[10px] font-medium">Cart</span>
          </button>
          <button onClick={() => handleNavigate('account')} className={`flex flex-col items-center ${currentScreen === 'account' ? 'text-emerald-800' : 'text-gray-500'}`}>
            <span className="text-lg">👤</span>
            <span className="text-[10px] font-medium">Account</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
