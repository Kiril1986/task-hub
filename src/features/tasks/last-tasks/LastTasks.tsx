import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import {
  editingTaskAtom,
  selectedParentTaskAtom,
  toastAtom,
} from './store/lastTasksStore';
import LastTaskCard from './components/LastTaskCard';
import StatusSwitchBar from './components/status-switch-bar/StatusSwitchBar';
import EditTaskModal from './components/edit-task-modal/EditTaskModal';
import { taskStatuses, type TaskStatus } from './constants';

import AddTaskModal from './components/add-task-modal/AddTaskModal';

import { Carousel } from '@/shared/ui/carousel/Carousel';
import { useTasks } from '@/features/hooks/use-last-tasks';
import ToastNotification from '@/shared/ui/toast-nofitication/ToastNotification';

type SortBy = 'asc' | 'desc';

export function LastTasks() {
  const [status, setStatus] = useState<TaskStatus>('All');
  const [sortBy, setSortBy] = useState<SortBy>('asc');
  const [editingTask] = useAtom(editingTaskAtom);
  const [selectedParentTask] = useAtom(selectedParentTaskAtom);
  const [toast] = useAtom(toastAtom);
  
  const { data: tasks = [], isLoading, error } = useTasks();

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
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      if (sortBy === 'asc') return dateA - dateB;
      else return dateB - dateA;
    });
  }, [tasks, status, sortBy]);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-between mt-4 mb-2 overflow-hidden">
        <h3 className="text-lg font-medium mb-2 mt-[0]">
          Last tasks
          <span className="text-muted-foreground">
            ({tasks.length})
          </span>
        </h3>
        <StatusSwitchBar currentStatus={status} onStatusChange={setStatus} statusCounts={statusCounts} sortBy={sortBy} onSortToggle={toggleSort} />
      </div>

      <Carousel
        items={sortedTasks}
        itemKey={(t) => t.id}
        renderItem={(t) => <LastTaskCard card={t} />}
      />

      {/* Модалка редактирования */}
      {editingTask && <EditTaskModal />}

      {/* Модалка добавления */}
      {selectedParentTask && (
        <AddTaskModal
          parentTaskId={selectedParentTask.id}
          parentTitle={selectedParentTask.title}
        />
      )}

      {/* Тост уведомление */}
      {toast && <ToastNotification />}
    </div>
  );
}

