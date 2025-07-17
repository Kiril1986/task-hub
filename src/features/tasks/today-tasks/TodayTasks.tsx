import WorkdayTimeline from './components/work-day-timeline/WorkDayTimeline';
import Avatar from '@/shared/ui/avatar/Avatar';
import { useTodayTasks } from '@/features/hooks/use-last-tasks';
import { avatarsMap } from '@/features/model/types';
import { useMemo } from 'react';

const VISIBLE_COUNT = 4;

export function TodayTasks() {
  const { data: todayTasks = [] } = useTodayTasks();

  const { visibleAssignees, remainingCount } = useMemo(() => {
    const all = todayTasks.flatMap(task => task.assignees);
    const unique = Array.from(new Set(all));
    return {
      visibleAssignees: unique.slice(0, VISIBLE_COUNT),
      remainingCount: unique.length - VISIBLE_COUNT,
    };
  }, [todayTasks]);

  return (
    <div className="bg-card rounded-2xl p-4 box-border">
      <div className="flex justify-between">
        <h3 className="text-base font-medium mb-2 cursor-pointer">Today Tasks</h3>
        <div className="flex items-center -gap-2 cursor-pointer">
          {visibleAssignees.map((assignee, index) => (
            <Avatar
              key={assignee}
              src={avatarsMap[assignee] || ''}
              withOverlap
              index={index}
              alt={`avatar-${assignee}`}
            />
          ))}

          {remainingCount > 0 && (
            <span className="w-8 h-8 rounded-full bg-[var(--chart-11)] flex items-center justify-center z-[1] text-base text-card -ml-2">
            +{remainingCount}
            </span>
          )}
        </div>
      </div>
      <WorkdayTimeline />
    </div>
  );
}
