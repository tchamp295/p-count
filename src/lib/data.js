import {
    AlertTriangle,
    BarChart,
    Bell,
    Home,
    Package2,
    Server,
    Settings,
    UserCheck,
    Users,
  } from "lucide-react";
  
  export const navItems = [
    {
      href: "/admin",
      icon: <Home />, // No size defined here
      title: "Dashboard",
    },
    {
      
      icon: <Server />,
      title: "Ips Management",
    },
    {
      href: "/alerts",
      icon: <Bell />,
      title: "Alerts",
      badgeCount: 6,
    },
    {
      href: "/contacts",
      icon: <Users />,
      title: "Contacts",
    },
    {
      href: "/reports",
      icon: <BarChart />,
      title: "Reports",
    },
    {
      href: "/advisories",
      icon: <AlertTriangle />,
      title: "Advisories",
    },
    {
      href: "/user-management",
      icon: <UserCheck />,
      title: "User Management",
    },
    {
      href: "/admin/settings",
      icon: <Settings />,
      title: "Settings",
    },
  ];
  