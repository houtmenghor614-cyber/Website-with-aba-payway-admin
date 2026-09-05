import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AdminProvider } from "./context/AdminContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AdminProvider>
          <AppRoutes />
        </AdminProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
