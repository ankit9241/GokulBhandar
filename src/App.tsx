import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from '@/context';
import NewProtectedRoute from './components/NewProtectedRoute';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import OffersPage from './pages/OffersPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import NewCheckoutPage from './pages/NewCheckoutPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import OrdersPage from './pages/OrdersPage';
import DeliveryPage from './pages/DeliveryPage';
import TrackPage from './pages/TrackPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import AdminCategoriesPage from './pages/admin/CategoriesPage';
import AdminAnalyticsPage from './pages/admin/AnalyticsPage';
import CustomersPage from './pages/admin/CustomersPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="profile" element={
            <NewProtectedRoute>
              <ProfilePage />
            </NewProtectedRoute>
          } />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={
            <NewProtectedRoute>
              <NewCheckoutPage />
            </NewProtectedRoute>
          } />
          <Route path="payment" element={
            <NewProtectedRoute>
              <PaymentPage />
            </NewProtectedRoute>
          } />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="register" element={<Navigate to="/signup" replace />} />
          
          {/* Protected User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="track" element={<TrackPage />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
