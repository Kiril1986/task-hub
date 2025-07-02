import { Bell, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

function Header() {
  return (
    <div className="w-full flex justify-between">
      <h1 className="font-[32px] text-foreground mt-[8px] font-[500]">Dashboard</h1>
      <div className="flex items-center gap-[16px] grow-[1] min-w-[0] justify-end">
        <div className="relative box-border min-w-[400px] max-w-[450px] grow-[1]">
          <Search className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[var(--chart-7)]" />
          <Input name="headerSearch"
            className="rounded-[40px] bg-card pt-[16px] pr-0 pb-[16px] pl-[36px] h-[64px] box-border flex-[1] placeholder:font-poppins"
            placeholder="Search something..."
            type="text" />
        </div>
        <span className="dark:bg-input/30 bg-card rounded-[50%] text-chart-7 cursor-pointer flex items-center justify-center w-[60px] h-[60px]">
          <Bell />
        </span>
      </div>
    </div>
  );
}

export default Header;