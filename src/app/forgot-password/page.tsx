'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="page-content">
        <section className="page-hero">
          <h1 className="page-title">비밀번호 찾기</h1>
        </section>

        <section className="section">
          <div className="container">
            <div className="auth-form-container">
              <div className="success-message">
                <h2>이메일을 확인해주세요</h2>
                <p>
                  <strong>{email}</strong>로 비밀번호 재설정 링크를 보냈습니다.
                </p>
                <p>
                  이메일의 링크를 클릭하여 새 비밀번호를 설정해주세요.
                </p>
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
            line-height: 1.6;
          }
          .success-actions {
            margin-top: 30px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">비밀번호 찾기</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="auth-form-container">
            <p className="form-description">
              가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
            </p>
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

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? '전송 중...' : '비밀번호 재설정 링크 보내기'}
              </button>

              <p className="auth-link">
                비밀번호가 기억나셨나요? <Link href="/login">로그인</Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .form-description {
          text-align: center;
          color: var(--color-muted);
          margin-bottom: 30px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
