'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const { login, resendVerificationEmail } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowResend(false);
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || '로그인에 실패했습니다.');
      // 이메일 인증이 필요한 경우 재발송 버튼 표시
      if (result.error?.includes('이메일 인증')) {
        setShowResend(true);
      }
    }
    
    setIsLoading(false);
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    const result = await resendVerificationEmail(email);
    if (result.success) {
      alert('인증 이메일이 재발송되었습니다. 이메일을 확인해주세요.');
    } else {
      setError(result.error || '이메일 재발송에 실패했습니다.');
    }
    setIsLoading(false);
  };

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">Login</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="비밀번호를 입력하세요"
                  minLength={6}
                />
              </div>

              {error && (
                <div className="error-container">
                  <p className="form-error">{error}</p>
                  {showResend && (
                    <button
                      type="button"
                      className="btn btn-secondary resend-btn"
                      onClick={handleResendEmail}
                      disabled={isLoading}
                    >
                      인증 메일 재발송
                    </button>
                  )}
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? '로그인 중...' : '로그인'}
              </button>

              <div className="auth-links">
                <p className="auth-link">
                  <Link href="/forgot-password">비밀번호를 잊으셨나요?</Link>
                </p>
                <p className="auth-link">
                  계정이 없으신가요? <Link href="/signup">회원가입</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .error-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resend-btn {
          font-size: 0.875rem;
        }
        .auth-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
