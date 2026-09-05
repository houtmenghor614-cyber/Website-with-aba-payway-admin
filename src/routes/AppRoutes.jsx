import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminProtectedRoute from "./AdminProtectedRoute";
import PublicRoute from "./PublicRoute";

import AdminLogin from "../pages/Auth/AdminLogin";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import CreateProduct from "../pages/Products/CreateProduct";
import EditProduct from "../pages/Products/EditProduct";
import ProductDetails from "../pages/Products/ProductDetails";
import Categories from "../pages/Categories/Categories";
import CreateCategory from "../pages/Categories/CreateCategory";
import EditCategory from "../pages/Categories/EditCategory";
import Orders from "../pages/Orders/Orders";
import OrderDetailsPage from "../pages/Orders/OrderDetails";
import Payments from "../pages/Payments/Payments";
import Users from "../pages/Users/Users";
import UserDetailsPage from "../pages/Users/UserDetails";
import Coupons from "../pages/Coupons/Coupons";
import CreateCoupon from "../pages/Coupons/CreateCoupon";
import EditCoupon from "../pages/Coupons/EditCoupon";
import Banners from "../pages/Banners/Banners";
import Stock from "../pages/Stock/Stock";
import Reviews from "../pages/Reviews/Reviews";
import Receipts from "../pages/Receipts/Receipts";
import Reports from "../pages/Reports/Reports";
import Notifications from "../pages/Notifications/Notifications";
import Telegram from "../pages/Telegram/Telegram";
import Settings from "../pages/Settings/Settings";
import StoreSettingsPage from "../pages/Settings/StoreSettings";
import AboutContent from "../pages/Settings/AboutContent";
import ContactContent from "../pages/Settings/ContactContent";
import PaymentSettingsPage from "../pages/Settings/PaymentSettings";
import TelegramSettingsPage from "../pages/Settings/TelegramSettings";
import ProfileSettingsRoute from "../pages/Settings/ProfileSettings";
import SecuritySettingsRoute from "../pages/Settings/SecuritySettings";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<CreateProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/new" element={<CreateCategory />} />
        <Route path="categories/:id/edit" element={<EditCategory />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
        <Route path="payments" element={<Payments />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetailsPage />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="coupons/new" element={<CreateCoupon />} />
        <Route path="coupons/:id/edit" element={<EditCoupon />} />
        <Route path="banners" element={<Banners />} />
        <Route path="stock" element={<Stock />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="telegram" element={<Telegram />} />
        <Route path="settings" element={<Settings />}>
          <Route index element={<StoreSettingsPage />} />
          <Route path="about" element={<AboutContent />} />
          <Route path="contact" element={<ContactContent />} />
          <Route path="payments" element={<PaymentSettingsPage />} />
          <Route path="telegram" element={<TelegramSettingsPage />} />
          <Route path="profile" element={<ProfileSettingsRoute />} />
          <Route path="security" element={<SecuritySettingsRoute />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
