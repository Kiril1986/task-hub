import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { memo } from 'react';

type Props = React.ComponentProps<typeof Button> & {
  icon: React.ReactNode;
  notificationsCount?: number;
  isActive?: boolean;
};

function SideBarButtonWithIcon({ icon, className, children, notificationsCount, isActive = false, ...props }: Props) {
  return (
    <Button
      variant="sidebar"
      className={cn(
        'flex rounded-[20px] items-center justify-start text-base cursor-pointer gap-[8px] w-full font-poppins p-[10px] border-none mb-[8px] bg-transparent',
        isActive
          ? 'bg-[var(--chart-6)] text-card'
          : 'hover:bg-muted hover:text-foreground transition-colors text-muted-foreground',
        className,
      )}
      size="lg"
      {...props}
    >
      {icon}
      <span>
        {children}
      </span>
      {notificationsCount !== undefined && notificationsCount > 0 && (
        <span className={cn(
          'ml-auto text-xs text-[var(--chart-6)] px-2 min-w-[28px] h-5',
          'bg-[var(--chart-8)] rounded-full flex items-center justify-center',
        )}>
          {notificationsCount}
        </span>
      )}
    </Button>
  );
}

export default memo(SideBarButtonWithIcon);