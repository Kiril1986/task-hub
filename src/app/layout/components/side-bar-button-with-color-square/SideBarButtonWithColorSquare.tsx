import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { memo } from 'react';

type Props = React.ComponentProps<typeof Button> & {
  color: string;
  isActive?: boolean;
};

function SideBarButtonWithColorSquare({ color, className, children, isActive = false, ...props }: Props) {
  return (
    <Button
      variant="sidebar"
      className={cn(
        'flex rounded-[20px] items-center cursor-pointer justify-start gap-[8px] text-base w-full font-poppins p-[10px] border-none mb-[8px] bg-transparent',
        isActive
          ? 'bg-[var(--chart-6)] text-card'
          : 'hover:bg-muted hover:text-foreground transition-colors text-muted-foreground',
        className,
      )}
      {...props}
    >
      <span
        className="w-[12px] h-[12px]"
        style={{ backgroundColor: color }}
      />
      {children}
    </Button>
  );
}
export default memo(SideBarButtonWithColorSquare);