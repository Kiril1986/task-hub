import { SquareCheck, ClockFading, FileClock } from 'lucide-react';
import type { TaskStatus } from '../../../constants';

const iconsCommonProps = 'text-[var(--chart-6)]';

const statusIcons = {
  'Done': <SquareCheck className={iconsCommonProps} size={16} />,
  'In progress': <ClockFading className={iconsCommonProps} size={16} />,
  'Upcoming': <FileClock className={iconsCommonProps} size={16} />,
};

type StatusSwitchProps = {
  status: TaskStatus;
  isActive: boolean;
  onClick: (status: TaskStatus) => void;
  count: number;
}

function StatusSwitch({ status, isActive, count, onClick }: StatusSwitchProps) {
  return (
    <div
      className={`items-center flex gap-2 ${isActive ? 'bg-[var(--chart-9)] text-white' : 'bg-muted text-foreground'} pl-3 pr-3 pt-0 pb-0 cursor-pointer width-16 border-solid text-sm rounded-3xl`}
      onClick={() => onClick(status)}
    >
      {status !== 'All' && statusIcons[status]}
      <span>{status}</span>
      <span className="flex items-center text-sm justify-center rounded-2xl p-2.5 box-border border border-[var(--foreground)] w-4 h-4">
        {count}
      </span>
    </div>
  );
}

export default StatusSwitch;