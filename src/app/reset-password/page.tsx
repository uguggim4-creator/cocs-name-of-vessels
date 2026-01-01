'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // URL에서 토큰 확인 및 세션 설정
    const checkSession = async () => {
      try {
        // Hash fragment에서 access_token 확인
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (type === 'recovery' && accessToken && refreshToken) {
          // 복구 세션 설정
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (!error) {
            setIsValidSession(true);
          } else {
            setError('유효하지 않은 링크입니다. 다시 시도해주세요.');
          }
        } else {
          // 이미 세션이 있는지 확인 (페이지 새로고침 등)
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setIsValidSession(true);
          } else {
            setError('유효하지 않은 링크입니다. 비밀번호 찾기를 다시 시도해주세요.');
          }
        }
      } catch (err) {
        setError('세션 확인 중 오류가 발생했습니다.');
      }
      setIsChecking(false);
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setError('비밀번호 변경 중 오류가 발생했습니다.');
    }

    setIsLoading(false);
  };

  // 로딩 중
  if (isChecking) {
    return (
      <div className="page-content">
        <section className="page-hero">
          <h1 className="page-title">비밀번호 재설정</h1>
        </section>
        <section className="section">
          <div className="container">
            <div className="auth-form-container">
              <p className="loading-text">확인 중...</p>
            </div>
          </div>
        </section>
        <style jsx>{`
          .loading-text {
            text-align: center;
            color: var(--color-muted);
          }
        `}</style>
      </div>
    );
  }

  // 성공
  if (isSuccess) {
    return (
      <div className="page-content">
        <section className="page-hero">
          <h1 className="page-title">비밀번호 재설정</h1>
        </section>
        <section className="section">
          <div className="container">
            <div className="auth-form-container">
              <div className="success-message">
                <h2>비밀번호가 변경되었습니다</h2>
                <p>새 비밀번호로 로그인해주세요.</p>
                <p className="redirect-text">잠시 후 로그인 페이지로 이동합니다...</p>
                <div className="success-actions">
                  <Link href="/login" className="btn btn-primary">
                    로그인 페이지로 이동
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <style jsx>{`
          .success-message {
            text-align: center;
            padding: 40px 20px;
          }
          .success-message h2 {
            margin-bottom: 20px;
            font-size: 1.5rem;
          }
          .success-message p {
            color: var(--color-muted);
            margin-bottom: 10px;
          }
          .redirect-text {
            font-size: 0.875rem;
          }
          .success-actions {
            margin-top: 30px;
          }
        `}</style>
      </div>
    );
  }

  // 유효하지 않은 세션
  if (!isValidSession) {
    return (
      <div className="page-content">
        <section className="page-hero">
          <h1 className="page-title">비밀번호 재설정</h1>
        </section>
        <section className="section">
          <div className="container">
            <div className="auth-form-container">
              <div className="error-message">
                <p className="form-error">{error}</p>
                <div className="error-actions">
                  <Link href="/forgot-password" className="btn btn-primary">
                    비밀번호 찾기로 이동
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <style jsx>{`
          .error-message {
            text-align: center;
            padding: 40px 20px;
          }
          .error-actions {
            margin-top: 30px;
          }
        `}</style>
      </div>
    );
  }

  // 비밀번호 재설정 폼
  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">비밀번호 재설정</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="auth-form-container">
            <p className="form-description">
              새로운 비밀번호를 입력해주세요.
            </p>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="password">새 비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="새 비밀번호 (6자 이상)"
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="새 비밀번호 확인"
                  minLength={6}
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? '변경 중...' : '비밀번호 변경'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .form-description {
          text-align: center;
          color: var(--color-muted);
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
}
