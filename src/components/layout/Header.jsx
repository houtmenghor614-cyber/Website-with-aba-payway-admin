import React from "react";
import { Menu } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import TopNavbar from "./TopNavbar";

export default function Header({ onOpenMobile }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-ink-100 h-16 flex items-center px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobile}
        aria-label="Open sidebar"
        className="lg:hidden p-2 -ml-2 rounded-lg text-ink-500 hover:bg-ink-100 mr-2"
      >
        <Menu className="w-5 h-5" />
      </button>
      <Breadcrumb />
      <div className="ml-auto">
        <TopNavbar />
      </div>
    </header>
  );
}
