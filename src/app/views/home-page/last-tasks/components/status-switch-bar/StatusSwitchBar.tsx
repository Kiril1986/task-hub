import type { TaskStatus } from '../../LastTasks';
import StatusSwitch from './components/StatusSwitch';
import { ArrowDown, ArrowUp } from 'lucide-react';

type SwitchBarProps = {
  currentStatus: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  statusCounts: Record<TaskStatus, number>;
  sortAsc: boolean;
  onSortToggle: () => void;
};

function StatusSwitchBar({currentStatus, onStatusChange, statusCounts, sortAsc, onSortToggle }: SwitchBarProps) {
  const statuses: (TaskStatus | 'All')[] = ['All', 'Done', 'In progress', 'Upcoming'];
  const changeStatus = (status: TaskStatus) => {
    onStatusChange(status);
  };
  
  return (
    <div className="flex gap-[2px]">
      {currentStatus !== 'Done' && (
        <button onClick={onSortToggle} className="border-none flex items-center justify-center w-[32px] h-[32px] rounded-[50%] bg-muted text-foreground cursor-pointer">
          {sortAsc ? (
            <ArrowUp className="w-[16px] h-[16px]" />
          ) : (
            <ArrowDown className="w-[16px] h-[16px]" />
          )}
        </button>
      )}
      {statuses.map((status, index) => {
        return <StatusSwitch 
          key={index} 
          status={status} 
          isActive={status === currentStatus}
          count={statusCounts[status]}
          onClick={changeStatus} />;
      })}
    </div>
  );
}

export default StatusSwitchBar;