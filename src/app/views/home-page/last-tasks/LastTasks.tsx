import { useState } from 'react';
import LastTaskCard from './components/LastTaskCard';
import StatusSwitchBar from './components/status-switch-bar/StatusSwitchBar';
import { lastTasks } from './mockLastTaskCards';

export type TaskStatus = 'All' | 'Done' | 'In progress' | 'Upcoming';

function LastTasks() {
  const [status, setStatus] = useState<TaskStatus>('All');

  const filteredTasks =
    status === 'All' ? lastTasks : lastTasks.filter((task) => task.status === status);

  const statusCounts = {
    All: lastTasks.length,
    Done: lastTasks.filter((t) => t.status === 'Done').length,
    'In progress': lastTasks.filter((t) => t.status === 'In progress').length,
    Upcoming: lastTasks.filter((t) => t.status === 'Upcoming').length,
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-[8px]">
        <h3 className="text-[16px] font-[500] mb-[8px] mt-[0]">
        Last tasks 
          <span className="text-muted-foreground">
          ({lastTasks.length})
          </span>
        </h3>
        <StatusSwitchBar currentStatus={status} onStatusChange={setStatus} statusCounts={statusCounts} />
      </div>
       
      <div className="flex gap-[16px] flex-wrap">
        {filteredTasks.map((card, index) => (
          <LastTaskCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

export default LastTasks;