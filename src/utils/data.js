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
      { href: "/admin/ips-management/alerts/all", label: "All Alerts" },
    ],
  },
  {
    icon: <Users />,
    title: "Contacts",
    links: [
      { href: "/contacts/list", label: "List of Contacts" },
      { href: "/contacts/grouping", label: "Contact Grouping" },
    ],
  },
  {
    icon: <BarChart />,
    title: "Reports",
    links: [
      { href: "/reports/alert", label: "Alert Reports" },
      { href: "/reports/ip-alerts", label: "IP Alerts" },
      { href: "/reports/contact-additions", label: "Contact Additions" },
      { href: "/reports/sfp-activity", label: "SFP Activity Report" },
      { href: "/reports/sfp-contact", label: "SFP Contact Report" },
    ],
  },
  {
    icon: <AlertTriangle />,
    title: "Advisories",
    links: [
      { href: "/admin/advisory", label: "Advisories" },
      { href: "/admin/advisoryCategory", label: "Advisory Categories" },
    ],
  },
  {
    icon: <UserCheck />,
    title: "User Management",
    links: [
      { href: "/admin/user-management", label: "System Users" },
    ],
  },
  {
    href: "/admin/settings",
    icon: <Settings />,
    title: "Settings",
  },
];
