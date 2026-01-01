'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const [message, setMessage] = useState('이메일 인증 처리 중...');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL에서 code 파라미터 확인
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          // PKCE flow: code를 세션으로 교환
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            throw error;
          }

          setMessage('이메일 인증이 완료되었습니다! 잠시 후 홈으로 이동합니다.');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          // Hash fragment에서 토큰 확인 (구버전 호환)
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');

          if (accessToken && refreshToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) {
              throw error;
            }

            setMessage('이메일 인증이 완료되었습니다! 잠시 후 홈으로 이동합니다.');
            setTimeout(() => {
              router.push('/');
            }, 2000);
          } else {
            throw new Error('인증 정보를 찾을 수 없습니다.');
          }
        }
      } catch (error: unknown) {
        setIsError(true);
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        setMessage(`인증 처리 중 오류가 발생했습니다: ${errorMessage}`);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">이메일 인증</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="auth-callback-container">
            {!isError ? (
              <div className="auth-callback-loading">
                <div className="spinner"></div>
                <p>{message}</p>
              </div>
            ) : (
              <div className="auth-callback-error">
                <p className="form-error">{message}</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => router.push('/login')}
                >
                  로그인 페이지로 이동
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .auth-callback-container {
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
          padding: 60px 20px;
        }
        .auth-callback-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .auth-callback-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
