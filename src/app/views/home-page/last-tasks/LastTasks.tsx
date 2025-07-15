import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import LastTaskCard from './components/LastTaskCard';
import StatusSwitchBar from './components/status-switch-bar/StatusSwitchBar';
import EditTaskModal from './components/edit-task-modal/EditTaskModal';
import { editingTaskAtom, tasksAtom, selectedParentTaskAtom } from './lastTasksStore';
import { taskStatuses, type TaskStatus } from './constants';
import { Carousel } from '@/app/shared/carousel/Carousel';
import AddTaskModal from './components/add-task-modal/AddTaskModal';
import ToastNotification from '@/app/shared/toast-nofitication/ToastNotification';

type SortBy = 'asc' | 'desc';

function LastTasks() {
  const [status, setStatus] = useState<TaskStatus>('All');
  const [sortBy, setSortBy] = useState<SortBy>('asc');
  const [tasks] = useAtom(tasksAtom);
  const [editingTask ] = useAtom(editingTaskAtom);
  const [selectedParentTask] = useAtom(selectedParentTaskAtom);
  const toggleSort = () => {
    setSortBy((prev) =>
      prev === 'asc' ? 'desc' : 'asc',
    );
  };
  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(taskStatuses.map((status) => [
      status,
      status === 'All' ? tasks.length : tasks.filter((t) => t.status === status).length,
    ])) as Record<TaskStatus, number>;

    return counts;
  }, [tasks]);

  const sortedTasks = useMemo(() => {
    const filtered = tasks.filter(
      (task) => status === 'All' || task.status === status,
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.daysLeft).getTime();
      const dateB = new Date(b.daysLeft).getTime();
      if (sortBy === 'asc') return dateA - dateB;
      else return dateB - dateA;
    });
  }, [tasks, status, sortBy]);

  return (
    <div>
      <div className="flex flex-wrap justify-between mt-4 mb-2 overflow-hidden">
        <h3 className="text-lg font-medium mb-2 mt-[0]">
          Last tasks 
          <span className="text-muted-foreground">
          ({tasks.length})
          </span>
        </h3>
        <StatusSwitchBar currentStatus={status} onStatusChange={setStatus} statusCounts={statusCounts} sortBy={sortBy} onSortToggle={toggleSort}/>
      </div>

      <Carousel
        items={sortedTasks}
        itemKey={(t) => t.id}
        renderItem={(t) => <LastTaskCard card={t} />}
      />
       
      {editingTask && (
        <EditTaskModal />
      )}
      <ToastNotification />
      <AddTaskModal parentTaskId={selectedParentTask?.id || ''} parentTitle={selectedParentTask?.title || ''} />
    </div>
  );
}

export default LastTasks;
