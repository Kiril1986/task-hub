import type { LastTask } from '../mockLastTaskCards';
import { Pencil, Plus } from 'lucide-react';
import ProgressBar from './progress-bar/ProgressBar';
import TaskInfoIcons from './task-info-icons/TaskInfoIcons';
import Avatar from '@/app/shared/avatar/Avatar';
import TaskTypeIcon from './task-type-icon/TaskTypeIcon';
import { useSetAtom } from 'jotai';
import { editingTaskAtom } from '../lastTasksstore';

type Props = {
    card: LastTask;
};

const getDaysLeft = (dueDate: string): number => {
  const now = new Date();
  const due = new Date(dueDate);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

function LastTaskCard({card}: Props) {
  const setEditingTask = useSetAtom(editingTaskAtom);
  

  const daysLeft = getDaysLeft(card.daysLeft);
  return (
    <div className="bg-card rounded-[20px] p-[16px] max-w-[295px] w-full box-border">
      <div className="flex items-start gap-[14px] mt-[8px] mb-[8px]">
        <TaskTypeIcon type={card.type} />
        <div>
          <p className="text-[16px] m-[0] font-[400] leading-tight max-w-[100px] line-clamp-2 break-words">
            {card.title}
          </p>
          <p className="text-[12px] m-[0] min-h-[16px] font-[300] text-muted-foreground">
            {daysLeft > 0 && `Due: ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="flex items-center mt-[8px] gap-[8px] cursor-pointer">
          {card.assignees.map((photo, index) => (
            <Avatar src={photo} alt={`avatar-${index}`} size="sm" key={index} withOverlap index={index}/>
          ))}
        </div>
      </div>
      <ProgressBar progress={card.progress} status={card.status} />
      <div className="mt-[8px] flex justify-between items-center">
        <TaskInfoIcons card={card}/>
        <div className="max-w-[100px] flex gap-[8px]">
          <span className="w-[24px] h-[24px] cursor-pointer rounded-full bg-[var(--chart-6)] text-card flex items-center justify-center text-[14px] font-medium leading-[14px]">
            <Plus className="size-[16px]"/>
          </span>
          <div
            className="
              w-[24px] 
              h-[24px] 
              cursor-pointer 
              rounded-full 
              bg-card 
              border 
              border-[var(--chart-6)] 
              flex 
              items-center 
              justify-center
            "
            onClick={() => setEditingTask(card)}
          >
            <Pencil className="w-[16px] h-[16px] text-[var(--chart-6)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastTaskCard;