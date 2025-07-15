import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useAuth } from '@/app/auth/use-auth';
import { LogOut } from 'lucide-react';

type Value = {
    name: string;
    email: string;
}

type SideBarSelectProps = {
    values: Value[];
}

function SideBarSelect({ values }: SideBarSelectProps) {
  const [selectValue, setSelectValue] = useState(values[0]?.name || '');
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const selected = values.find(v => v.name === selectValue);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
    setOpen(false);
  };
  return (
    <Select
      value={selectValue}
      onValueChange={(value) => setSelectValue(value)}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger
        className="w-full ml-auto min-w-26 min-h-11 flex rounded-4xl gap-1 bg-[var(--accent)] border-none cursor-pointer font-poppins"
      >
        <div className="w-8 h-8 rounded-full bg-[var(--chart-6)] shrink-0" />
        {selected ? (
          <div className="flex items-center gap-3 text-left text-xs">
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-muted-foreground">{selected.name}</span>
              <span className="text-xs text-muted-foreground">{selected.email}</span>
            </div>
          </div>
        ) : null}
      </SelectTrigger>
      <SelectContent>
        {values.map(({ name, email }) => (
          <SelectItem
            key={email}
            value={name}
            className="flex items-center gap-3 text-xs"
          >
            <div className="w-3 h-3 rounded-full bg-[var(--chart-6)] flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold">{name}</span>
              <span className="text-xs text-muted-foreground">{email}</span>
            </div>
          </SelectItem>
        ))}
        <button
          onPointerDown={e => e.preventDefault()}
          className="px-3 py-2 w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white border-0 rounded mt-1"
          onClick={handleLogoutClick}
        >
          <span>Logout</span>
          <LogOut size={16}/>
        </button>
      </SelectContent>
    </Select>
  );
}

export default SideBarSelect;
