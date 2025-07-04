import { Plane, UsersRound, BookOpen, Bug, Computer, Palette } from 'lucide-react';
import styles from './TaskTypeIcon.module.css';
import type { TaskType } from '../../mockLastTaskCards';

type Props = {
  type: TaskType;
};

const iconsMap = {
  design: Palette,
  dev: Computer,
  bug: Bug,
  docs: BookOpen,
  meeting: UsersRound,
  travel: Plane,
};

export default function TaskTypeIcon({ type }: Props) {
  const IconComponent = iconsMap[type];
  return (
    <div className={`w-[32px] h-[32px] rounded-full flex items-center mt-[4px] justify-center ${styles.iconBg}`}>
      {IconComponent && <IconComponent className="text-[var(--chart-6)] w-[16px] h-[16px]" />}
    </div>
  );
}