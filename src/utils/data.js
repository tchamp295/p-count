import {
  AlertTriangle,
  BarChart,
  Bell,
  Home,
  Server,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";

export const navItems = [
  {
    href: "/admin",
    icon: <Home />,
    title: "Dashboard",
  },
  {
    icon: <Server />,
    title: "Ips Management",
    links: [
      { href: "/admin/ips-management/ips", label: "List of IPs" },
      { href: "/admin/ips-management/regions", label: "Regions" },
      { href: "/admin/ips-management/sfps", label: "List of SFPS" },
    ],
  },
  {
    icon: <Bell />,
    title: "Alerts",
    badgeCount: 6,
    links: [
      { href: "/admin/ips-management/alerts/create", label: "Create New" },
      { href: "/admin/ips-management/alerts/active", label: "Active Alerts" },
      { href: "/admin/ips-management/alerts", label: "All Alerts" },
    ],
  },
  {
    icon: <Users />,
    title: "Contacts",
    links: [
      { href: "/admin/contact-management/list", label: " Contacts List" },
      { href: "/admin/contact-management/group", label: "Contact Grouping" },
    ],
  },
  {
    icon: <BarChart />,
    title: "Reports",
    links: [
      { href: "/admin/stats/alerts", label: "Alert Reports" },
      { href: "/admin/stats/ip-alerts", label: "IP Alerts" },
      { href: "/admin/stats/contact-addition", label: "Contact Additions" },
      { href: "/admin/stats//sfp-activity", label: "SFP Activity Report" },
      { href: "/admin/stats//sfp-contact", label: "SFP Contact Report" },
    ],
  },
  {
    icon: <AlertTriangle />,
    title: "Advisories",
    links: [
      { href: "/admin/advisory", label: "Advisories" },
      { href: "/admin/advisoryCategory", label: "Categories" },
    ],
  },
  {
    icon: <UserCheck />,
    title: "User Management",
    links: [
      { href: "/admin/user-management", label: "Users" },
    ],
  },
  {
    href: "/admin/settings",
    icon: <Settings />,
    title: "Settings",
  },
];
