import React from 'react';
import MainLayout from './layout/MainLayout';
import HomePage from './views/home-page/HomePage';
import { useAuth } from './auth/use-auth';
import WelcomeScreen from './views/welcome-screen/WelcomeScreen';
import LoginModal from './auth/LoginModal';

function App() {
  const { isAuthenticated, isLoginModalOpen, openLoginModal } = useAuth();
  
  return (
    <>
      <React.StrictMode>
        <MainLayout >
          {isAuthenticated ? <HomePage /> : <WelcomeScreen onLoginClick={openLoginModal} />}
          {isLoginModalOpen && <LoginModal />}
        </MainLayout >
      </React.StrictMode>
    </>
  );
}

export default App;
