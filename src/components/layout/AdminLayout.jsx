import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import MobileSidebar from "./MobileSidebar";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-ink-100">
      <Sidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
