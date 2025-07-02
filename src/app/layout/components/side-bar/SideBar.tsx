import { useState, useCallback } from 'react';

import { sections } from './constants';
import styles from './SideBar.module.css';

import { cn } from '@/lib/utils';
import SideBarItem from '../side-bar-item/SideBarItem';

function SideBar() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const onSelect = useCallback((key: string) => {
    setSelectedItem(key);
  }, []);
  return (
    <aside className="w-64 border-r bg-white p-6 space-y-8 mt-[36px] p-[8px]">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className={cn('text-xs font-semibold text-muted-foreground text-base mb-2 tracking-wider', styles.sectionTitle)}>
            {section.title}
          </h4>
          <nav className="flex flex-col gap-2">
            {section.items.map((item) => (
              <SideBarItem
                key={item.key}
                item={item}
                isActive={selectedItem === item.key}
                onSelect={onSelect}
              />
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
}

export default SideBar;
