import {
  AlertTriangle,
  BarChart,
  Bell,
  LayoutGrid,
  ListFilter,
  MapPin,
  Settings,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  FolderOpen,
  Globe,
  ClipboardList,
  PieChart,
  ClipboardCheck,
  UserCog,
  Plus,
} from "lucide-react";

export const navItems = [
  {
    href: "/admin",
    icon: <LayoutGrid />,
    title: "Dashboard",
  },
  {
    icon: <UserPlus />,
    title: "IPs",
    links: [
      { href: "/admin/ips", label: "IP List", icon: <ListFilter /> },
      { href: "/admin/ips/create", label: "Add IP", icon: <Plus /> },
    ],
  },
  {
    icon: <MapPin />,
    title: "Regions",
    links: [
      { href: "/admin/regions", label: "Region List", icon: <Globe /> },
      { href: "/admin/regions/create", label: "Add Region", icon: <Plus /> },
    ],
  },
  {
    icon: <UsersRound />,
    title: "SFPs",
    links: [
      { href: "/admin/sfps", label: "SFP List", icon: <ClipboardList /> },
      { href: "/admin/sfps/create", label: "Add SFP", icon: <Plus /> },
    ],
  },
  {
    icon: <Bell />,
    title: "Alerts",
    badgeCount: 6,
    links: [
      { href: "/admin/alerts/create", label: "Add Alert", icon: <Plus /> },
      { href: "/admin/alerts/active", label: "Active Alerts", icon: <ClipboardCheck /> },
      { href: "/admin/alerts", label: "All Alerts", icon: <FolderOpen /> },
    ],
  },
  {
    icon: <Users />,
    title: "Contacts",
    links: [
      { href: "/admin/contacts/list", label: "Contact List", icon: <Users /> },
      { href: "/admin/contacts/group", label: "Manage Groups", icon: <UserCog /> },
    ],
  },
  {
    icon: <BarChart />,
    title: "Reports",
    links: [
      { href: "/admin/stats/alerts", label: "Alert Reports", icon: <PieChart /> },
      { href: "/admin/stats/ip-alerts", label: "IP Reports", icon: <AlertTriangle /> },
      { href: "/admin/stats/contact-addition", label: "New Contacts", icon: <Plus /> },
      { href: "/admin/stats/sfp-activity", label: "SFP Activity", icon: <ClipboardList /> },
      { href: "/admin/stats/sfp-contact", label: "SFP Contacts", icon: <ClipboardCheck /> },
    ],
  },
  {
    icon: <AlertTriangle />,
    title: "Advisories",
    links: [
      { href: "/admin/advisory", label: "Advisories List", icon: <FolderOpen /> },
      { href: "/admin/advisory/category", label: "Manage Categories", icon: <ListFilter /> },
    ],
  },
  {
    icon: <UserCheck />,
    title: "Admins",
    links: [
      { href: "/admin/users", label: "Manage Admins", icon: <Users /> },
    ],
  },
  {
    href: "/admin/settings",
    icon: <Settings />,
    title: "Settings",
  },
];
