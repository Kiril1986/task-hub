import { useState } from 'react';
import TodayTaskCard from '../today-card/TodayCard';
import clsx from 'clsx';
import { useTodayTasks } from '@/features/hooks/use-last-tasks';
import type { LastTask } from '@/features/model/types';

const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9–17

function formatHour(hour: number) {
  const period = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

function getTaskStartingAt(tasks: LastTask[], hour: number) {
  return tasks.find(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate.getHours() === hour;
  });
}

export default function WorkdayTimeline() {
  const [activeHour, setActiveHour] = useState<number | null>(null);

  const { data: todayTasks = [], isLoading, error } = useTodayTasks();

  if (isLoading) {
    return <div className="p-4">Loading today tasks...</div>;
  }

  if (error || !todayTasks) {
    return <div className="p-4 text-red-500">Error loading tasks</div>;
  }
  return (
    <div className="p-4 shadow-md">
      <div className="grid grid-cols-9 gap-2">
        {hours.map((hour) => {
          const task = getTaskStartingAt(todayTasks, hour);
          const isActive = activeHour === hour;
          
          return (
            <div
              key={hour}
              className="relative h-6 rounded-xl bg-muted flex items-center justify-center p-1 cursor-pointer"
              onClick={() => setActiveHour(isActive ? null : hour)}
            >
              <span
                className={clsx(
                  'absolute top-1 left-1 text-base',
                  task && isActive ? 'text-[var(--chart-6)] font-medium' : 'text-muted-foreground',
                )}
              >
                {formatHour(hour)}
              </span>

              <div className="mt-2 min-h-[130px]">
                {task && isActive && (
                  <div className="absolute z-10 top-12 left-4">
                    <TodayTaskCard task={task} key={task.id} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
