import { useAtom } from 'jotai';
import { isAuthenticatedAtom, isLoginModalOpenAtom, openLoginModalAtom, closeLoginModalAtom } from './auth-store';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

type LoginResult =
  | { success: true; user: User }
  | { success: false; error: string };

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useState<User | null>(null);

  // Модалка
  const [isLoginModalOpen] = useAtom(isLoginModalOpenAtom);
  const [, openLoginModal] = useAtom(openLoginModalAtom);
  const [, closeLoginModal] = useAtom(closeLoginModalAtom);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      }
      setIsAuthenticated(!!data.user);
      setUser(data.user ?? null);
    };

    checkSession().catch(console.error);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setIsAuthenticated]);

  const login = async ({ email, password }: { email: string; password: string }): Promise<LoginResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Login error:', error.message);
      return { success: false, error: error.message };
    }

    setUser(data.user);
    setIsAuthenticated(true);
    closeLoginModal();
    return { success: true, user: data.user };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    login,
    logout,
    user,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  };
}
