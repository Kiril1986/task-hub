import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import LastTaskCard from './components/LastTaskCard';
import StatusSwitchBar from './components/status-switch-bar/StatusSwitchBar';
import { lastTasks } from './mockLastTaskCards';
import EditTaskModal from './components/edit-task-modal/EditTaskModal';
import { editingTaskAtom, tasksAtom } from './lastTasksstore';


export type TaskStatus = 'All' | 'Done' | 'In progress' | 'Upcoming';

function LastTasks() {
  const [status, setStatus] = useState<TaskStatus>('All');
  const [sortAsc, setSortAsc] = useState(true);
  const toggleSort = () => setSortAsc((prev) => !prev);

  const [tasks] = useAtom(tasksAtom);
  const [editingTask ] = useAtom(editingTaskAtom);
  
  const statusCounts = {
    All: tasks.length,
    Done: tasks.filter((t) => t.status === 'Done').length,
    'In progress': tasks.filter((t) => t.status === 'In progress').length,
    Upcoming: tasks.filter((t) => t.status === 'Upcoming').length,
  };

  const sortedTasks = useMemo(() => {
    const filtered = tasks.filter(
      (task) => status === 'All' || task.status === status,
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.daysLeft).getTime();
      const dateB = new Date(b.daysLeft).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
  }, [tasks, status, sortAsc]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-[8px]">
        <h3 className="text-[16px] font-[500] mb-[8px] mt-[0]">
        Last tasks 
          <span className="text-muted-foreground">
          ({lastTasks.length})
          </span>
        </h3>
        <StatusSwitchBar currentStatus={status} onStatusChange={setStatus} statusCounts={statusCounts} sortAsc={sortAsc}
          onSortToggle={toggleSort}/>
      </div>
       
      <div className="flex gap-[16px] flex-wrap">
        {sortedTasks.map((card, index) => (
          <LastTaskCard key={index} card={card} />
        ))}
      </div>
      {editingTask && (
        <EditTaskModal />
      )}
    </div>
  );
}

export default LastTasks;