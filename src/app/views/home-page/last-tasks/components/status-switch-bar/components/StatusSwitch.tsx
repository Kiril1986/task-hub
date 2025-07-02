import type { TaskStatus } from '../../../LastTasks';
import { SquareCheck, ClockFading, FileClock } from 'lucide-react';

const iconsCommonProps = 'w-[16px] h-[16px] text-[var(--chart-6)]';

const statusIcons = {
  'Done': <SquareCheck className={iconsCommonProps} />,
  'In progress': <ClockFading className={iconsCommonProps}/>,
  'Upcoming': <FileClock className={iconsCommonProps}/>,
};

type StatusSwitchProps = {
    status: TaskStatus;
    isActive: boolean;
    onClick: (status: TaskStatus) => void;
    count: number;
}

function StatusSwitch({status, isActive, count, onClick}: StatusSwitchProps) {
  return (
    <div 
      className={`
        items-center 
        flex 
        gap-[8px] 
        ${isActive ? 'bg-[var(--chart-9)] text-white' : 'bg-muted text-foreground'} 
        pl-[8px] 
        cursor-pointer 
        pr-[8px] 
        width-[48px] 
        border-solid 
        text-[16px] 
        rounded-[20px]
        `}
      onClick={() => onClick(status)}
    >
      {status === 'All' ? '' : statusIcons[status]}
      {status}
      <span className="flex items-center justify-center rounded-[50%] border border-[var(--foreground)] w-[16px] h-[16px]">
        {count}
      </span>
    </div>
  );
}

export default StatusSwitch;