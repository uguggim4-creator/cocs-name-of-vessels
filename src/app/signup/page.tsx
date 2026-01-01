'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signup, resendVerificationEmail } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    const result = await signup(email, password, name);
    
    if (result.success) {
      if (result.needsVerification) {
        setIsSuccess(true);
      } else {
        router.push('/');
      }
    } else {
      setError(result.error || '회원가입에 실패했습니다.');
    }
    
    setIsLoading(false);
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    const result = await resendVerificationEmail(email);
    if (result.success) {
      setError('');
      alert('인증 이메일이 재발송되었습니다.');
    } else {
      setError(result.error || '이메일 재발송에 실패했습니다.');
    }
    setIsLoading(false);
  };

  // 회원가입 성공 후 이메일 인증 안내 화면
  if (isSuccess) {
    return (
      <div className="page-content">
        <section className="page-hero">
          <h1 className="page-title">이메일 인증</h1>
        </section>

        <section className="section">
          <div className="container">
            <div className="auth-form-container">
              <div className="verification-message">
                <div className="verification-icon">✉️</div>
                <h2>인증 메일이 발송되었습니다</h2>
                <p>
                  <strong>{email}</strong>로 인증 메일을 보냈습니다.
                </p>
                <p>
                  이메일의 인증 링크를 클릭하면 회원가입이 완료됩니다.
                </p>
                <div className="verification-actions">
                  <button 
                    className="btn btn-secondary" 
                    onClick={handleResendEmail}
                    disabled={isLoading}
                  >
                    {isLoading ? '발송 중...' : '인증 메일 재발송'}
                  </button>
                  <Link href="/login" className="btn btn-primary">
                    로그인 페이지로 이동
                  </Link>
                </div>
                {error && <p className="form-error">{error}</p>}
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .verification-message {
            text-align: center;
            padding: 40px 20px;
          }
          .verification-icon {
            font-size: 64px;
            margin-bottom: 20px;
          }
          .verification-message h2 {
            margin-bottom: 20px;
            font-size: 1.5rem;
          }
          .verification-message p {
            color: var(--color-text-light);
            margin-bottom: 10px;
            line-height: 1.6;
          }
          .verification-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 30px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">Sign Up</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="이름을 입력하세요"
                />
              </div>

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
                  placeholder="비밀번호를 입력하세요 (6자 이상)"
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="비밀번호를 다시 입력하세요"
                  minLength={6}
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? '가입 중...' : '회원가입'}
              </button>

              <p className="auth-link">
                이미 계정이 있으신가요? <Link href="/login">로그인</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
