import portrait1 from '@/assets/images/portrait1.png';
import portrait2 from '@/assets/images/portrait2.png';
import portrait3 from '@/assets/images/portrait3.png';

export type TaskType = 'design' | 'dev' | 'bug' | 'docs' | 'meeting' | 'travel';

export type LastTask = {
  id: string;
  title: string;
  daysLeft: string;
  progress: number;
  messages: number;
  images: number;
  attachments: number;
  type: TaskType;
  status: 'Done' | 'Upcoming' | 'In progress',
  assignees: string[];
};

const now = new Date();

const addDays = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const assignees = [portrait1, portrait2, portrait3];

export const lastTasks: LastTask[] = [
  // Done (3 tasks)
  {
    id: '1',
    title: 'Fix login redirect bug',
    daysLeft: addDays(0),
    progress: 100,
    messages: 12,
    images: 3,
    attachments: 2,
    type: 'bug',
    assignees,
    status: 'Done',
  },
  {
    id: '4',
    title: 'Code review for payment module',
    daysLeft: addDays(0),
    progress: 100,
    messages: 6,
    images: 2,
    attachments: 0,
    type: 'dev',
    assignees,
    status: 'Done',
  },
  {
    id: '5',
    title: 'Update user documentation',
    daysLeft: addDays(0),
    progress: 100,
    messages: 3,
    images: 1,
    attachments: 1,
    type: 'docs',
    assignees,
    status: 'Done',
  },

  // Upcoming (3 tasks)
  {
    id: '2',
    title: 'Design profile settings UI',
    daysLeft: addDays(2),
    progress: 0,
    messages: 4,
    images: 0,
    attachments: 1,
    type: 'design',
    assignees,
    status: 'Upcoming',
  },
  {
    id: '6',
    title: 'Plan sprint backlog',
    daysLeft: addDays(5),
    progress: 0,
    messages: 1,
    images: 0,
    attachments: 0,
    type: 'meeting',
    assignees,
    status: 'Upcoming',
  },
  {
    id: '7',
    title: 'Prepare marketing flyer',
    daysLeft: addDays(3),
    progress: 0,
    messages: 2,
    images: 5,
    attachments: 0,
    type: 'design',
    assignees,
    status: 'Upcoming',
  },

  // In progress (3 tasks)
  {
    id: '3',
    title: 'Implement API for user roles',
    daysLeft: addDays(1),
    progress: 60,
    messages: 8,
    images: 1,
    attachments: 3,
    type: 'dev',
    assignees,
    status: 'In progress',
  },
  {
    id: '8',
    title: 'Fix UI bugs on dashboard',
    daysLeft: addDays(4),
    progress: 40,
    messages: 5,
    images: 2,
    attachments: 1,
    type: 'bug',
    assignees,
    status: 'In progress',
  },
  {
    id: '9',
    title: 'Write meeting notes',
    daysLeft: addDays(2),
    progress: 50,
    messages: 7,
    images: 0,
    attachments: 0,
    type: 'docs',
    assignees,
    status: 'In progress',
  },
];
