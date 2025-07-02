import {
  CalendarDays,
  ChartNoAxesColumn,
  LayoutGrid,
  MessageCircleMore,
  Settings,
  Users,
} from 'lucide-react';

import type { ReactNode } from 'react';

type Value = {
  name: string;
  email: string;
}

export type NavItem = {
  key: string;
  label: string;
  href: string;
  icon?: ReactNode;
  colorSquare?: string;
  notificationsCount?: number;
  values?: Value[];
};

export type Section = {
  title: string;
  items: NavItem[];
};

export const sections: Section[] = [
  {
    title: 'Account',
    items: [{ key: 'account-profile', label: 'Profile', href: '#', values: [{ name: 'Awe Std', email: 'awestd@gmail.com' }] }],
  },
  {
    title: 'Main Menu',
    items: [
      { key: 'menu-dashboard', label: 'Dashboard', icon: <LayoutGrid className="h-4 w-4" />, href: '#' },
      { key: 'menu-message', label: 'Message', icon: <MessageCircleMore className="h-4 w-4" />, href: '#', notificationsCount: 4 },
      { key: 'menu-insight', label: 'Insight', icon: <ChartNoAxesColumn className="h-4 w-4" />, href: '#' },
      { key: 'menu-team', label: 'Team', icon: <Users className="h-4 w-4" />, href: '#' },
      { key: 'menu-schedule', label: 'Schedule', icon: <CalendarDays className="h-4 w-4" />, href: '#' },
      { key: 'menu-settings', label: 'Settings', icon: <Settings className="h-4 w-4" />, href: '#' },
    ],
  },
  {
    title: 'Projects',
    items: [
      { key: 'project-landing', label: 'Landing Page', href: '#', colorSquare: '#6D2CDE' },
      { key: 'project-mobile', label: 'Mobile App', href: '#', colorSquare: '#DC59DE' },
      { key: 'project-dashboard', label: 'Dashboard', href: '#', colorSquare: '#DED123' },
      { key: 'project-flyer', label: 'Flyer', href: '#', colorSquare: '#D49522' },
      { key: 'project-branding', label: 'Branding', href: '#', colorSquare: '#145C3F' },
    ],
  },
];
