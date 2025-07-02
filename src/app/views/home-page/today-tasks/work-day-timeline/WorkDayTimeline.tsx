import { useState } from 'react';
import { todayTasks } from '../mockTodayCards';
import TodayTaskCard from '../today-card/TodayCard';
import clsx from 'clsx';

const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9–17

function formatHour(hour: number) {
  const period = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

function getTaskStartingAt(hour: number) {
  const formatted = formatHour(hour);
  return todayTasks.find(task =>
    task.time.toLowerCase().startsWith(formatted),
  );
}

export default function WorkdayTimeline() {
  const [activeHour, setActiveHour] = useState<number | null>(null);
  return (
    <div className="p-[16px] shadow-md">
      <div className="grid grid-cols-9 gap-[8px]">
        {hours.map((hour) => {
          const task = getTaskStartingAt(hour);
          const isActive = activeHour === hour;

          return (
            <div
              key={hour}
              className="relative h-[24px] rounded-[12px] bg-muted flex items-center justify-center p-[4px] cursor-pointer"
              onClick={() => setActiveHour(isActive ? null : hour)}
            >
              <span
                className={clsx(
                  'absolute top-[4px] left-[4px] text-[12px]',
                  task && isActive ? 'text-[var(--chart-6)] font-medium' : 'text-muted-foreground',
                )}
              >
                {formatHour(hour)}
              </span>

              {task && isActive && (
                <div className="absolute top-full -left-[4px] mt-[4px] z-10">
                  <TodayTaskCard task={task} key={task.id} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
