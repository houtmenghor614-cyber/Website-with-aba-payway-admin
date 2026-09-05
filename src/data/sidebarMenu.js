import {
  BadgePercent,
  BarChart3,
  Bell,
  Box,
  CreditCard,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  Package,
  Receipt,
  Send,
  Settings,
  Shirt,
  Star,
  Users,
} from "lucide-react";

export const MENU_ICONS = {
  layoutDashboard: LayoutDashboard,
  barChart3: BarChart3,
  shirt: Shirt,
  folderTree: FolderTree,
  badgePercent: BadgePercent,
  image: ImageIcon,
  box: Box,
  package: Package,
  creditCard: CreditCard,
  receipt: Receipt,
  users: Users,
  star: Star,
  bell: Bell,
  send: Send,
  settings: Settings,
};

export function iconFor(name) {
  return MENU_ICONS[name] || LayoutDashboard;
}

export const SIDEBAR_MENU = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/admin", icon: "layoutDashboard", end: true },
      { label: "Reports", to: "/admin/reports", icon: "barChart3" },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { label: "Products", to: "/admin/products", icon: "shirt" },
      { label: "Categories", to: "/admin/categories", icon: "folderTree" },
      { label: "Coupons", to: "/admin/coupons", icon: "badgePercent" },
      { label: "Banners", to: "/admin/banners", icon: "image" },
      { label: "Stock", to: "/admin/stock", icon: "box" },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Orders", to: "/admin/orders", icon: "package" },
      { label: "Payments", to: "/admin/payments", icon: "creditCard" },
      { label: "Receipts", to: "/admin/receipts", icon: "receipt" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Customers", to: "/admin/users", icon: "users" },
      { label: "Reviews", to: "/admin/reviews", icon: "star" },
      { label: "Notifications", to: "/admin/notifications", icon: "bell" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Telegram bot", to: "/admin/telegram", icon: "send" },
      { label: "Settings", to: "/admin/settings", icon: "settings" },
    ],
  },
];
