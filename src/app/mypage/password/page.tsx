'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function PasswordChangePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      // 현재 비밀번호로 재인증
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user!.email!,
        password: currentPassword,
      });

      if (signInError) {
        setError('현재 비밀번호가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      // 새 비밀번호로 업데이트
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError('비밀번호 변경에 실패했습니다.');
      } else {
        setMessage('비밀번호가 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError('비밀번호 변경 중 오류가 발생했습니다.');
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="page-content">
        <section className="section">
          <div className="container">
            <p className="loading-text">로딩 중...</p>
          </div>
        </section>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">비밀번호 변경</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-container">
            <Link href="/mypage" className="back-link">← 마이페이지로 돌아가기</Link>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="currentPassword">현재 비밀번호</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="현재 비밀번호를 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">새 비밀번호</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              {message && <p className="form-success">{message}</p>}

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? '변경 중...' : '비밀번호 변경'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .loading-text {
          text-align: center;
          color: var(--color-muted);
          padding: 60px 0;
        }
        .form-container {
          max-width: 480px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 30px;
          color: var(--color-muted);
          font-size: 0.875rem;
        }
        .back-link:hover {
          color: var(--color-text);
        }
        .form-success {
          color: var(--color-secondary);
          font-size: 0.875rem;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}
