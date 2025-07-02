import { MessageSquareText, Image, Paperclip } from 'lucide-react';
import type { LastTask } from '../../mockLastTaskCards';

type Props = {
    card: LastTask;
}

const iconClass = 'w-[12px] h-[12px] text-muted-foreground';
const textClass = 'text-[12px] text-chart-7';

export default function TaskInfoIcons({ card }: Props) {
  return (
    <div className="flex gap-[8px] max-w-[100px] items-center cursor-pointer">
      <MessageSquareText className={iconClass} />
      <span className={textClass}>
        {card.messages}
      </span>
      <Image className={iconClass} />
      <span className={textClass}>
        {card.images}
      </span>
      <Paperclip className={iconClass} />
      <span className={textClass}>
        {card.attachments}
      </span>
    </div>
  );
}
