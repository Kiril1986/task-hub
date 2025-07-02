import portrait1 from '@/assets/images/portrait1.png';
import portrait2 from '@/assets/images/portrait2.png';
import portrait3 from '@/assets/images/portrait3.png';

export type TaskType = 'design' | 'dev' | 'bug' | 'docs' | 'meeting' | 'travel';

export type TodayTask = {
  id: string;
  title: string;
  time: string;
  participants: string[];
  participantImages: string[];
  type: TaskType;
};

const participantImagesMap: Record<string, string> = {
  Billy: portrait1,
  Van: portrait2,
  Steve: portrait3,
};

export const todayTasks: TodayTask[] = [
  {
    id: '1',
    title: 'Travel App User Flow',
    time: '10 am - 1.30 pm',
    participants: ['Billy', 'Van', 'Steve'],
    participantImages: ['Billy', 'Van', 'Steve'].map(name => participantImagesMap[name]),
    type: 'travel',
  },
  {
    id: '2',
    title: 'Travel App User Flow',
    time: '3 pm - 5 pm',
    participants: ['Van', 'Billy', 'Steve'],
    participantImages: ['Van', 'Billy', 'Steve'].map(name => participantImagesMap[name]),
    type: 'travel',
  },
];
