import { memo, useCallback } from 'react';
import SideBarButtonWithColorSquare from '../side-bar-button-with-color-square/SideBarButtonWithColorSquare';
import SideBarButtonWithIcon from '../side-bar-button-with-icon/SideBarButtonWithIcon';
import SideBarSelect from '../side-bar-select/SideBarSelect';
import type { NavItem } from '../side-bar/constants';

type SideBarItemProps = {
  item: NavItem;
  isActive: boolean;
  onSelect: (key: string) => void;
};

const SideBarItem = memo(({ item, isActive, onSelect }: SideBarItemProps) => {
  const handleClick = useCallback(() => {
    onSelect(item.key);
  }, [item.key, onSelect]);

  const commonProps = {
    size: 'lg' as const,
    onClick: handleClick,
    isActive,
  };

  if (item.colorSquare) {
    return (
      <SideBarButtonWithColorSquare
        key={item.key}
        {...commonProps}
        color={item.colorSquare}
      >
        {item.label}
      </SideBarButtonWithColorSquare>
    );
  }

  if (item.values) {
    return <SideBarSelect key={item.key} values={item.values} />;
  }

  return (
    <SideBarButtonWithIcon
      key={item.key}
      {...commonProps}
      icon={item.icon}
      notificationsCount={item.notificationsCount}
    >
      {item.label}
    </SideBarButtonWithIcon>
  );
});

export default SideBarItem;
