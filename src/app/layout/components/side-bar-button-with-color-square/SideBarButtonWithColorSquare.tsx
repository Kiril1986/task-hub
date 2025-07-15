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
        'flex rounded-3xl items-center cursor-pointer justify-start gap-2 text-sm w-full font-poppins p-3 border-none mb-2 bg-transparent',
        isActive
          ? 'bg-[var(--chart-6)] text-card'
          : 'hover:bg-muted hover:text-foreground transition-colors text-muted-foreground',
        className,
      )}
      {...props}
    >
      <span
        className="w-3 h-3"
        style={{ backgroundColor: color }}
      />
      {children}
    </Button>
  );
}
export default memo(SideBarButtonWithColorSquare);