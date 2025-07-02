import clsx from 'clsx';
import styles from './ProgressBar.module.css';
import { CircleCheck } from 'lucide-react';

type Props = {
  progress: number;
  status: 'Done' | 'In progress' | 'Upcoming'
};

const PROGRESS_MINIMUM = 25;
const PROGRESS_MAXIMUM = 100;

export default function ProgressBar({ progress, status}: Props) {
  const className = clsx(
    'h-[40px] flex items-center justify-center',
    styles.progressBarStriped,
    {
      [styles.green]: status === 'Done',
      [styles.purple]: status === 'In progress',
      [styles.yellow]: status === 'Upcoming',
    },
  );

  return (
    <div className="bg-ring rounded-[24px] h-[40px] overflow-hidden">
      <div className={className} style={{ width: `${progress}%` }}>
        {progress >= PROGRESS_MINIMUM && progress < 100 && (
          <p className="text-[var(--card)] text-[12px] z-[2] relative">{progress}%</p>
        )}
        {progress === PROGRESS_MAXIMUM && (
          <p className="text-[var(--card)] text-[12px] z-[2] relative flex items-center gap-[4px]">
            <CircleCheck className="w-[16px] h-[16px]" />
            Done
          </p>
        )}
      </div>
    </div>
  );
}
