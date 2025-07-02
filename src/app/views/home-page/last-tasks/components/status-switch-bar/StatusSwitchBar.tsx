import type { TaskStatus } from '../../LastTasks';
import StatusSwitch from './components/StatusSwitch';

type SwitchBarProps = {
  currentStatus: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  statusCounts: Record<TaskStatus, number>;
};

function StatusSwitchBar({currentStatus, onStatusChange, statusCounts }: SwitchBarProps) {
  const statuses: (TaskStatus | 'All')[] = ['All', 'Done', 'In progress', 'Upcoming'];
  const changeStatus = (status: TaskStatus) => {
    onStatusChange(status);
  };

  return (
    <div className="flex gap-[2px]">
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