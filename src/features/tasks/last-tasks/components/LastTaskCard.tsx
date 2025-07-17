import { Pencil, Plus } from 'lucide-react';
import ProgressBar from './progress-bar/ProgressBar';
import TaskInfoIcons from './task-info-icons/TaskInfoIcons';
import TaskTypeIcon from './task-type-icon/TaskTypeIcon';
import { useSetAtom } from 'jotai';
import { editingTaskAtom, setCreatingTaskAtom, setSelectedParentTaskAtom } from '../store/lastTasksStore';
import { memo } from 'react';
import Avatar from '@/shared/ui/avatar/Avatar';
import { avatarsMap, type LastTask } from '@/features/model/types';

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
  const setCreatingTask = useSetAtom(setCreatingTaskAtom);
  const setSelectedParentTask = useSetAtom(setSelectedParentTaskAtom);
  
  const daysLeft = getDaysLeft(card.dueDate);
  return (
    <div className="bg-card rounded-2xl p-3 max-w-70 w-full box-border">
      <div className="flex items-start gap-4 mt-2 mb-2">
        <TaskTypeIcon type={card.type} />
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <p className="text-sm m-[0] font-medium leading-tight max-w-26 line-clamp-2 break-words">
              {card.title}
            </p>
            <p className="m-[0] pt-2 h-5 text-xs font-light text-muted-foreground">
              {daysLeft > 0 && `Due: ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex items-start mt-2 cursor-pointer">
            {card.assignees.map((fileName, index) => {
              const src = avatarsMap[fileName] || '';
              return <Avatar src={src} alt={`avatar-${index}`} size="sm" key={index} withOverlap index={index} />;
            })}
          </div>
        </div>
        
      </div>
      <ProgressBar progress={card.progress} status={card.status} />
      <div className="mt-2 flex justify-between items-center">
        <TaskInfoIcons card={card}/>
        <div className="max-w-26 flex gap-2">
          <span 
            className="w-8 h-8 cursor-pointer rounded-full bg-[var(--chart-6)] text-card flex items-center justify-center text-base font-medium leading-4" 
            onClick={() => {
              setSelectedParentTask(card);
              setCreatingTask(true);
            }}
          >
            <Plus size={16}/>
          </span>
          <div
            className="w-8 h-8 cursor-pointer rounded-full bg-card border border-[var(--chart-6)] flex items-center justify-center"
            onClick={() => setEditingTask(card)}
          >
            <Pencil className="w-4 h-4 text-[var(--chart-6)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LastTaskCard);