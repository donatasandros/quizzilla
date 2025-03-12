import {
  ChartBarIcon,
  HomeIcon,
  LibraryIcon,
  LifeBuoyIcon,
  SettingsIcon,
  TelescopeIcon,
  UsersIcon,
} from "lucide-react";

export const NAV_LINKS = [
  {
    id: "13a4ba61-9027-499c-b8d7-92858724cedf",
    label: "Home",
    href: "/overview",
    icon: HomeIcon,
  },
  {
    id: "05b8c6fd-3ac3-4367-a356-f4aed9741413",
    label: "Discover",
    href: "/discover",
    icon: TelescopeIcon,
  },
  {
    id: "6c1de68b-4c62-43f3-8f14-6427e69c14dc",
    label: "Library",
    href: "/library",
    icon: LibraryIcon,
  },
  {
    id: "8b41c855-839a-47d5-8b76-65d69a426aa1",
    label: "Reports",
    href: "/reports",
    icon: ChartBarIcon,
  },
  {
    id: "169e546d-d1e5-4fcd-8784-7bcadb71adfa",
    label: "Groups",
    href: "/groups",
    icon: UsersIcon,
  },
];

export const NAV_BOTTOM_LINKS = [
  {
    id: "6c429d2a-f4f8-48c1-82d1-54c7628b4f19",
    label: "Support",
    href: "/support",
    icon: LifeBuoyIcon,
  },
  {
    id: "286ca483-7979-4f86-8c32-1c829c268bbd",
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];
