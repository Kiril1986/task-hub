import portrait1 from '@/assets/images/portrait1.png';
import portrait2 from '@/assets/images/portrait2.png';
import portrait3 from '@/assets/images/portrait3.png';
import WorkdayTimeline from './work-day-timeline/WorkDayTimeline';
import Avatar from '@/app/shared/avatar/Avatar';

const avatars = [portrait1, portrait2, portrait3];

function TodayTasks() {
  const totalCount = 10;
  const visibleCount = 4;

  const fullList = Array.from({ length: totalCount }, (_, i) => avatars[i % avatars.length]);
  const visibleAvatars = fullList.slice(0, visibleCount);
  const remainingCount = totalCount - visibleCount;

  return (
    <div className="bg-card rounded-[20px] p-[16px] box-border">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[500] mb-[8px] cursor-pointer">Today Tasks</h3>
        <div className="flex items-center gap-[-8px] cursor-pointer">
          {visibleAvatars.map((avatar, index) => (
            <Avatar src={avatar} key={index} withOverlap index={index} alt={`avatar-${index}`} />
          ))}

          {remainingCount > 0 && (
            <span className="w-[32px] h-[32px] rounded-full bg-[var(--chart-11)] flex items-center justify-center z-[1] text-[14px] text-card -ml-[8px]">
            +{remainingCount}
            </span>
          )}
        </div>
      </div>
      <WorkdayTimeline />
    </div>
  );
}

export default TodayTasks;
