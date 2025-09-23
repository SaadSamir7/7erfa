import {
  LayoutDashboard,
  UserCircle,
  BookHeart,
  ListOrdered,
  Search,
} from "lucide-react";

export const workerMenuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    page: "/worker-dashboard",
  },
  {
    title: "Orders",
    icon: <ListOrdered size={20} />,
    page: "/worker-dashboard/orders",
  },
  {
    title: "Reviews",
    icon: <BookHeart size={20} />,
    page: "/worker-dashboard/reviews",
  },
  {
    title: "Profile",
    icon: <UserCircle size={20} />,
    page: "/worker-dashboard/profile",
  },
];

export const customerMenuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    page: "/customer-dashboard",
  },
  {
    title: "Search Workers",
    icon: <Search size={20} />,
    page: "/customer-dashboard/search",
  },
  {
    title: "Orders",
    icon: <ListOrdered size={20} />,
    page: "/customer-dashboard/orders",
  },
  {
    title: "Profile",
    icon: <UserCircle size={20} />,
    page: "/customer-dashboard/profile",
  },
];
