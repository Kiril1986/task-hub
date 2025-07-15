import { useState, useCallback } from 'react';

import { sections } from './constants';

import SideBarItem from '../side-bar-item/SideBarItem';

function SideBar() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const onSelect = useCallback((key: string) => {
    setSelectedItem(key);
  }, []);
  return (
    <aside className="w-64 bg-white space-y-8 mt-6 p-4 col-span-1">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold text-gray-300 text-base mb-2 tracking-wider">
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
