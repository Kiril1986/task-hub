import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

type Value = {
    name: string;
    email: string;
}

type SideBarSelectProps = {
    values: Value[];
}

function SideBarSelect({ values }: SideBarSelectProps) {
  const [selectValue, setSelectValue] = useState(values[0]?.name || '');

  const selected = values.find(v => v.name === selectValue);
  return (
    <Select
      value={selectValue}
      onValueChange={(value) => setSelectValue(value)}
    >
      <SelectTrigger
        className="
          w-full 
          ml-auto 
          min-w-[100px] 
          min-h-[44px] 
          flex
          rounded-[40px] 
          gap-[4px]
          bg-[var(--accent)] 
          border-none 
          cursor-pointer
          font-poppins
          "
      >
        <div className="w-[32px] h-[32px] rounded-full bg-[var(--chart-6)] shrink-0" />
        {selected ? (
          <div className="flex items-center gap-3 text-left text-sm">
            <div className="flex flex-col leading-tight">
              <span className="font-[600] text-muted-foreground">{selected.name}</span>
              <span className="text-[10px] text-muted-foreground">{selected.email}</span>
            </div>
          </div>
        ) : null}
      </SelectTrigger>
      <SelectContent>
        {values.map(({ name, email }) => (
          <SelectItem
            key={email}
            value={name}
            className="flex items-center gap-3 text-sm"
          >
            <div className="w-3 h-3 rounded-full bg-[var(--chart-6)] flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold">{name}</span>
              <span className="text-[10px] text-muted-foreground">{email}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SideBarSelect;
