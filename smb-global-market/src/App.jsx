import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import DashboardNav from './components/common/DashboardNav';
import ProtectedRoute from './components/common/ProtectedRoute';
import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';

import Home from './pages/customer/Home';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import ForgotPassword from './pages/customer/ForgotPassword';
import Categories from './pages/customer/Categories';
import Search from './pages/customer/Search';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import Orders from './pages/customer/Orders';
import OrderDetail from './pages/customer/OrderDetail';
import Profile from './pages/customer/Profile';
import Addresses from './pages/customer/Addresses';
import BecomeAVendor from './pages/customer/BecomeAVendor';

import VendorRegister from './pages/vendor/VendorRegister';
import VendorLogin from './pages/vendor/VendorLogin';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProducts from './pages/vendor/VendorProducts';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorEarnings from './pages/vendor/VendorEarnings';
import VendorProfile from './pages/vendor/VendorProfile';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminVendors from './pages/admin/AdminVendors';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';

import NotFound from './pages/NotFound';

function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function VendorLayout() {
  const links = [
    { to: '/vendor/dashboard', label: 'Dashboard' },
    { to: '/vendor/products', label: 'Products' },
    { to: '/vendor/orders', label: 'Orders' },
    { to: '/vendor/earnings', label: 'Earnings' },
    { to: '/vendor/profile', label: 'Profile' }
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DashboardNav links={links} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/customers', label: 'Customers' },
    { to: '/admin/vendors', label: 'Vendors' },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/orders', label: 'Orders' },
    { to: '/admin/payments', label: 'Payments' },
    { to: '/admin/settings', label: 'Settings' }
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav links={links} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('smb_splash_seen'));
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('smb_onboarded'));
  const [lang, setLang] = useState('en');

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => {
          sessionStorage.setItem('smb_splash_seen', 'true');
          setShowSplash(false);
        }}
      />
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingScreen
        lang={lang}
        setLang={setLang}
        onNavigate={() => {
          localStorage.setItem('smb_onboarded', 'true');
          setShowOnboarding(false);
        }}
      />
    );
  }

  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/become-a-vendor" element={<BecomeAVendor />} />

        <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Checkout /></ProtectedRoute>} />
        <Route path="/order-success" element={<ProtectedRoute allowedRoles={['customer']}><OrderSuccess /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute allowedRoles={['customer']}><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute allowedRoles={['customer']}><OrderDetail /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/addresses" element={<ProtectedRoute allowedRoles={['customer']}><Addresses /></ProtectedRoute>} />
      </Route>

      <Route path="/vendor/register" element={<VendorRegister />} />
      <Route path="/vendor/login" element={<VendorLogin />} />
      <Route element={<ProtectedRoute allowedRoles={['vendor']}><VendorLayout /></ProtectedRoute>}>
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/products" element={<VendorProducts />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/earnings" element={<VendorEarnings />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/vendors" element={<AdminVendors />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
