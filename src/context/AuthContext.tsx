'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 현재 세션 확인
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          return { success: false, error: '이메일 인증이 필요합니다. 이메일을 확인해주세요.' };
        }
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: '로그인 중 오류가 발생했습니다.' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            display_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          return { success: false, error: '이미 등록된 이메일입니다.' };
        }
        return { success: false, error: error.message };
      }

      // Supabase는 이메일 인증이 필요한 경우 user는 있지만 session은 없음
      if (data.user && !data.session) {
        return { success: true, needsVerification: true };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: '회원가입 중 오류가 발생했습니다.' };
    }
  };

  const resendVerificationEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: '이메일 재발송 중 오류가 발생했습니다.' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup, resendVerificationEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
