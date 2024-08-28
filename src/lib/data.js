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
      { href: "/alerts/create", label: "Create New" },
      { href: "/alerts/active", label: "Active Alerts" },
      { href: "/alerts/all", label: "All Alerts" },
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
      { href: "/advisories/list", label: "Advisories" },
      { href: "/advisories/types", label: "Advisory Types" },
    ],
  },
  {
    icon: <UserCheck />,
    title: "User Management",
    links: [
      { href: "/user-management/system-users", label: "System Users" },
    ],
  },
  {
    href: "/admin/settings",
    icon: <Settings />,
    title: "Settings",
  },
];
