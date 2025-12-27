import type { LucideIcon } from "lucide-react";
import {
    LayoutDashboard,
    UserCircle,
    BookHeart,
    ListOrdered,
    Search,
} from "lucide-react";

export type MenuItem = {
    title: string;
    icon: LucideIcon;
    page: string;
};

const workerMenuItems: MenuItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, page: "/worker-dashboard" },
    { title: "Orders", icon: ListOrdered, page: "/worker-dashboard/orders" },
    { title: "Reviews", icon: BookHeart, page: "/worker-dashboard/reviews" },
    { title: "Profile", icon: UserCircle, page: "/worker-dashboard/profile" },
];

const customerMenuItems: MenuItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, page: "/dashboard" },
    { title: "Search Workers", icon: Search, page: "/dashboard/search" },
    { title: "Orders", icon: ListOrdered, page: "/dashboard/orders" },
    { title: "Profile", icon: UserCircle, page: "/dashboard/profile" },
];

export default function MenuItems(role: "worker" | "customer") {
    return role === "worker" ? workerMenuItems : customerMenuItems;
}
