import activeProjectsIcon from './assets/active-projects.svg';
import ongoingProjectsIcon from './assets/ongoing-projects.svg';
import workingHoursIcon from './assets/working-hours.svg';

export const iconsMap = {
  'active-projects': activeProjectsIcon,
  'ongoing-projects': ongoingProjectsIcon,
  'working-hours': workingHoursIcon,
} as const;

export type Card = {
    icon: keyof typeof iconsMap;
    number: string;
    text: string;
    background: string;
};


export const cardsData = [
  {
    icon: 'active-projects',
    number: '92',
    text: 'Active Project',
    background: 'var(--chart-8)',
  },
  {
    icon: 'ongoing-projects',
    number: '35',
    text: 'On Going Project',
    background: 'var(--chart-4)',
  },
  {
    icon: 'working-hours',
    number: '19h 9m',
    text: 'Working hours',
    background: 'var(--chart-9)',
  },
] as const;