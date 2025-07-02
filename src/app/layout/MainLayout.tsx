import type { ReactNode } from 'react';

import Header from './components/header/Header';
import SideBar from './components/side-bar/SideBar';
import styles from './MainLayout.module.css';

import { useTheme } from '@/utils/useTheme';

type Props = {
    children?: ReactNode;
}

function MainLayout({children}: Props) {
  useTheme();
  return (
    <div className={styles.mainLayout}>
      <SideBar />
      <div className={styles.center}>
        <Header />
        <main>
          {children}
        </main>
      </div>
      
    </div>
  );
}

export default MainLayout;