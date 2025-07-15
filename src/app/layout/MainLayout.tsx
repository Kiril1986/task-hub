import type { ReactNode } from 'react';

import Header from './components/header/Header';
import SideBar from './components/side-bar/SideBar';

import { useTheme } from '@/utils/useTheme';

type Props = {
    children?: ReactNode;
}

function MainLayout({children}: Props) {
  useTheme();
  return (
    <div className="grid grid-cols-[250px_minmax(0,_1fr)_300px] gap-4">
      <SideBar/>
      <div className="p-4 bg-neutral-400/20 max-w-236 w-full mx-auto">
        <Header />
        <main>
          {children}
        </main>
      </div>
      <div>Ad</div>
    </div>
  );
}

export default MainLayout;