import type { TodayTask } from '../mockTodayCards';
import { Plane } from 'lucide-react';
import styles from './TodayCard.module.css';
import Avatar from '@/app/shared/avatar/Avatar';

type Props = {
  task: TodayTask;
};

export default function TodayTaskCard({ task }: Props) {
  return (
    <div className="bg-[var(--chart-11)] p-[12px] rounded-[12px] shadow-md w-[200px]">
      <div className="flex flex-column gap-[8px]">
        <div className={`w-[32px] h-[32px] rounded-full bg-[var(--card)] flex items-center mt-[4px] justify-center ${styles.iconBg}`}>
          <Plane className="text-[var(--chart-6)] size-[16px]" />
        </div>
        <div>
          <h4 className="text-[14px] font-[400] text-card mb-[4px] mt-[0]">{task.title}</h4>
          <p className="text-[12px] text-card mb-[8px] mt-[0]">{task.time}</p>
        </div>
      </div>
      <div className="flex -space-x-2">
        {task.participantImages.map((img, index) => (
          <Avatar src={img} index={index} size="sm" key={index} withOverlap alt={`avatar-${index}`} />
        ))}
      </div>
    </div>
  );
}
