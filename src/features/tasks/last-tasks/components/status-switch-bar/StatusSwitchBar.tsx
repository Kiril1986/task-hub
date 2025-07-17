import type { TaskStatus } from '../../constants';
import StatusSwitch from './components/StatusSwitch';
import { ArrowDown, ArrowUp } from 'lucide-react';

type SwitchBarProps = {
  currentStatus: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  statusCounts: Record<TaskStatus, number>;
  sortBy: 'asc' | 'desc';
  onSortToggle: () => void;
};

function StatusSwitchBar({currentStatus, onStatusChange, statusCounts, sortBy, onSortToggle }: SwitchBarProps) {
  const statuses: (TaskStatus | 'All')[] = ['All', 'Done', 'In progress', 'Upcoming'];
  const changeStatus = (status: TaskStatus) => {
    onStatusChange(status);
  };
  
  return (
    <div className="flex gap-1">
      
      <button onClick={onSortToggle} disabled={currentStatus === 'Done'} className="border-none flex items-center justify-center w-8 h-8 rounded-xl bg-muted text-foreground cursor-pointer">
        {sortBy === 'asc' ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )}
      </button>
      
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