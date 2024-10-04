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
  Dot,
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
      { href: "/admin/ips", label: "IP List", icon: <Dot /> },
      { href: "/admin/ips/create", label: "Add IP", icon: <Dot /> },
    ],
  },
  {
    icon: <MapPin />,
    title: "Regions",
    links: [
      { href: "/admin/regions", label: "Region List", icon: <Dot /> },
      { href: "/admin/regions/create", label: "Add Region", icon: <Dot /> },
    ],
  },
  {
    icon: <UsersRound />,
    title: "SFPs",
    links: [
      { href: "/admin/sfps", label: "SFP List", icon: <Dot /> },
      { href: "/admin/sfps/create", label: "Add SFP", icon: <Dot /> },
    ],
  },
  {
    icon: <Bell />,
    title: "Alerts",
    badgeCount: 6,
    links: [
      { href: "/admin/alerts/create", label: "New Alert", icon: <Dot /> },
      { href: "/admin/alerts/active", label: "Active", icon: <Dot /> },
      { href: "/admin/alerts", label: "All Alerts", icon: <Dot /> },
    ],
  },
  {
    icon: <Users />,
    title: "Contacts",
    links: [
      { href: "/admin/contacts/list", label: "Contact List", icon: <Dot /> },
      { href: "/admin/contacts/group", label: "Groups", icon: <Dot /> },
    ],
  },
  {
    icon: <BarChart />,
    title: "Reports",
    links: [
      { href: "/admin/stats/alerts", label: "Alert Reports", icon: <Dot /> },
      { href: "/admin/stats/ip-alerts", label: "IP Reports", icon: <Dot /> },
      {
        href: "/admin/stats/contact-addition",
        label: "New Contacts",
        icon: <Dot />,
      },
      {
        href: "/admin/stats/sfp-activity",
        label: "SFP Activity",
        icon: <Dot />,
      },
      {
        href: "/admin/stats/sfp-contact",
        label: "SFP Contacts",
        icon: <Dot />,
      },
    ],
  },
  {
    icon: <AlertTriangle />,
    title: "Advisories",
    links: [
      { href: "/admin/advisory", label: "Advisory List", icon: <Dot /> },
      { href: "/admin/advisory/category", label: "Categories", icon: <Dot /> },
    ],
  },
  {
    icon: <UserCheck />,
    title: "Admins",
    links: [
      { href: "/admin/users", label: "Admins", icon: <Dot /> },
      { href: "/admin/users/create", label: "Add Admin", icon: <Dot /> },
    ],
  },
  {
    href: "/admin/settings",
    icon: <Settings />,
    title: "Settings",
  },
];
