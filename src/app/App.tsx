import MainLayout from './layout/MainLayout';
import HomePage from './views/home-page/HomePage';
import { useAuth } from './auth/use-auth';
import WelcomeScreen from './views/welcome-screen/WelcomeScreen';
import LoginModal from './auth/LoginModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { isAuthenticated, isLoginModalOpen, openLoginModal } = useAuth();
  const queryClient = new QueryClient();
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainLayout >
          {isAuthenticated ? <HomePage /> : <WelcomeScreen onLoginClick={openLoginModal} />}
          {isLoginModalOpen && <LoginModal />}
        </MainLayout >
      </QueryClientProvider>
    </>
  );
}

export default App;
