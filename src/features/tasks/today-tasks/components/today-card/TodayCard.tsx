import { Plane } from 'lucide-react';
import styles from './TodayCard.module.css';

import type { LastTask } from '@/features/model/types';
import Avatar from '@/shared/ui/avatar/Avatar';
import { avatarsMap } from '@/features/model/types';

type Props = {
  task: LastTask;
};

function formatHourFromDate(dateString: string) {
  const date = new Date(dateString);
  const hour = date.getHours();
  const period = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

export default function TodayTaskCard({ task }: Props) {
  return (
    <div className="bg-[var(--chart-11)] p-4 rounded-md shadow-md w-50">
      <div className="flex flex-column gap-2">
        <div className={`w-8 h-8 rounded-full bg-[var(--card)] flex p-2 items-center mt-1 justify-center ${styles.iconBg}`}>
          <Plane className="text-[var(--chart-6)]" size={16} />
        </div>
        <div>
          <h4 className="text-sm font-normal text-card mb-1 mt-[0]">{task.title}</h4>
          <p className="text-xs text-card mb-2 mt-[0]">{formatHourFromDate(task.dueDate)}</p>
        </div>
      </div>
      <div className="flex -space-x-2">
        {task.assignees.map((img, index) => {
          const src = avatarsMap[img] || '';
          return (
            <Avatar src={src} index={index} size="sm" key={index} withOverlap alt={`avatar-${index}`} />
          );
        })}
      </div>
    </div>
  );
}
