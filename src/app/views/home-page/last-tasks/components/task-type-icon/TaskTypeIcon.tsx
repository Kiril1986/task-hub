import styles from './TaskTypeIcon.module.css';
import type { TaskType } from '../../mockLastTaskCards';
import { iconsMap } from './iconsMap';

type Props = {
  type: TaskType;
};


export default function TaskTypeIcon({ type }: Props) {
  const IconComponent = iconsMap[type];
  return (
    <div className={`w-10 h-10 rounded-full shrink-0 flex items-center mt-1 justify-center ${styles.iconBg}`}>
      {IconComponent && <IconComponent size={16} className="text-[var(--chart-6)]" />}
    </div>
  );
}