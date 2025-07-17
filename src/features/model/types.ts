import portrait1 from '@/assets/images/portrait1.png';
import portrait2 from '@/assets/images/portrait2.png';
import portrait3 from '@/assets/images/portrait3.png';

export type TaskType = 'design' | 'dev' | 'bug' | 'docs' | 'meeting' | 'travel';

export type TaskStatus = 'Done' | 'Upcoming' | 'In progress';

export type LastTask = {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  messages: number;
  images: number;
  attachments: number;
  type: TaskType;
  status: TaskStatus;
  assignees: string[];
  subtasks?: LastTask[];
  parent_id?: string;
};

export const avatarsMap: Record<string, string> = {
  'portrait1.png': portrait1,
  'portrait2.png': portrait2,
  'portrait3.png': portrait3,
};