import portrait1 from '@/assets/images/portrait1.png';
import portrait2 from '@/assets/images/portrait2.png';
import portrait3 from '@/assets/images/portrait3.png';

export type TaskType = 'design' | 'dev' | 'bug' | 'docs' | 'meeting' | 'travel';

export type LastTask = {
  id: string;
  title: string;
  daysLeft: number;
  progress: number;
  messages: number;
  images: number;
  attachments: number;
  type: TaskType;
  status: 'Done' | 'Upcoming' | 'In progress',
  assignees: string[];
};

const assignees = [portrait1, portrait2, portrait3];

export const lastTasks: LastTask[] = [
  {
    id: '1',
    title: 'Fix login redirect bug',
    daysLeft: 0,
    progress: 25,
    messages: 12,
    images: 3,
    attachments: 2,
    type: 'bug',
    assignees,
    status: 'Done',
  },
  {
    id: '2',
    title: 'Design profile settings UI',
    daysLeft: 2,
    progress: 100,
    messages: 4,
    images: 0,
    attachments: 1,
    type: 'design',
    assignees,
    status: 'Upcoming',
  },
  {
    id: '3',
    title: 'Implement API for user roles',
    daysLeft: 1,
    progress: 90,
    messages: 8,
    images: 1,
    attachments: 3,
    type: 'dev',
    assignees,
    status: 'In progress',
  },
];
