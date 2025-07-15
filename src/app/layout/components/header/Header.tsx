import { Bell, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

function Header() {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl mt-4 mb-[0] font-medium">Dashboard</h1>
      <div className="flex items-center gap-2 flex-1 min-w-[0] justify-end">
        <div className="relative box-border max-w-md flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--chart-7)]" />
          <Input name="headerSearch"
            className="rounded-4xl bg-card pt-4 pr-0 pb-4 pl-12 h-16 box-border flex-[1] placeholder:font-poppins"
            placeholder="Search something..."
            type="text" />
        </div>
        <span className="dark:bg-input/30 bg-card rounded-4xl w-15 h-15 text-chart-7 cursor-pointer flex items-center justify-center">
          <Bell />
        </span>
      </div>
    </div>
  );
}

export default Header;