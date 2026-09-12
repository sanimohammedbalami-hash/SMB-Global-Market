import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import TrackOrderPage from './pages/TrackOrderPage';
import FavoritesPage from './pages/FavoritesPage';
import CategoriesPage from './pages/CategoriesPage';
import AccountPage from './pages/AccountPage';
import EditProfilePage from './pages/EditProfilePage';
import AddressPage from './pages/AddressPage';
import NotificationPage from './pages/NotificationPage';
import CustomerServicePage from './pages/CustomerServicePage';
import AuthPage from './pages/AuthPage';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('smb_current_page') || 'home';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('smb_is_logged_in') === 'true';
  });

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('smb_lang') || 'ha';
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('smb_current_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('smb_is_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('smb_lang', lang);
  }, [lang]);

  const handleNavigate = (page, product = null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('smb_is_logged_in');
    setCurrentPage('login');
  };

  if (!isLoggedIn && currentPage !== 'login') {
    return <AuthPage onLogin={handleLogin} lang={lang} setLang={setLang} />;
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-xl">
      {currentPage === 'login' && (
        <AuthPage onLogin={handleLogin} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'details' && (
        <ProductDetailsPage
          product={selectedProduct}
          onNavigate={handleNavigate}
          lang={lang}
          setLang={setLang}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'orders' && (
        <OrdersPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'track' && (
        <TrackOrderPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'favorites' && (
        <FavoritesPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'categories' && (
        <CategoriesPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'account' && (
        <AccountPage
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          lang={lang}
          setLang={setLang}
        />
      )}

      {currentPage === 'edit-profile' && (
        <EditProfilePage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'address' && (
        <AddressPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'notification' && (
        <NotificationPage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}

      {currentPage === 'customer-service' && (
        <CustomerServicePage onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      )}
    </div>
  );
}

export default App;
