'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function WithdrawPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handlePasswordVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: user!.email!,
        password,
      });

      if (error) {
        setError('비밀번호가 올바르지 않습니다.');
      } else {
        setStep(2);
      }
    } catch (err) {
      setError('인증 중 오류가 발생했습니다.');
    }

    setIsLoading(false);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (confirmText !== '회원탈퇴') {
      setError('"회원탈퇴"를 정확히 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 프로필 삭제 (cascade로 addresses도 삭제됨)
      await supabase.from('profiles').delete().eq('id', user!.id);
      
      // 배송지 삭제 (혹시 모르니)
      await supabase.from('addresses').delete().eq('user_id', user!.id);

      // 세션 종료
      await supabase.auth.signOut();

      // 홈으로 이동
      alert('회원 탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.');
      router.push('/');
    } catch (err) {
      setError('회원 탈퇴 처리 중 오류가 발생했습니다.');
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
        <h1 className="page-title">회원 탈퇴</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="withdraw-container">
            <Link href="/mypage" className="back-link">← 마이페이지로 돌아가기</Link>

            {step === 1 && (
              <>
                <div className="warning-box">
                  <h3>회원 탈퇴 시 주의사항</h3>
                  <ul>
                    <li>회원 탈퇴 시 모든 개인 정보가 삭제됩니다.</li>
                    <li>저장된 배송지 정보가 모두 삭제됩니다.</li>
                    <li>주문 내역은 관련 법령에 따라 일정 기간 보관됩니다.</li>
                    <li>탈퇴 후에는 동일한 이메일로 재가입이 가능합니다.</li>
                  </ul>
                </div>

                <form onSubmit={handlePasswordVerify} className="auth-form">
                  <p className="form-description">
                    본인 확인을 위해 비밀번호를 입력해주세요.
                  </p>

                  <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="현재 비밀번호"
                    />
                  </div>

                  {error && <p className="form-error">{error}</p>}

                  <button type="submit" className="btn btn-secondary" disabled={isLoading}>
                    {isLoading ? '확인 중...' : '다음'}
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <form onSubmit={handleWithdraw} className="auth-form">
                <div className="final-warning">
                  <p>정말로 탈퇴하시겠습니까?</p>
                  <p>이 작업은 되돌릴 수 없습니다.</p>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmText">
                    탈퇴를 확인하려면 아래에 <strong>"회원탈퇴"</strong>를 입력하세요.
                  </label>
                  <input
                    type="text"
                    id="confirmText"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    required
                    placeholder="회원탈퇴"
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    취소
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-danger" 
                    disabled={isLoading || confirmText !== '회원탈퇴'}
                  >
                    {isLoading ? '처리 중...' : '탈퇴하기'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .loading-text {
          text-align: center;
          color: var(--color-muted);
          padding: 60px 0;
        }
        .withdraw-container {
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
        .warning-box {
          background: #fff8f8;
          border: 1px solid #ffcccc;
          padding: 24px;
          margin-bottom: 30px;
        }
        .warning-box h3 {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 16px;
          color: #cc0000;
        }
        .warning-box ul {
          padding-left: 20px;
        }
        .warning-box li {
          font-size: 0.875rem;
          color: var(--color-text);
          margin-bottom: 8px;
          list-style: disc;
        }
        .form-description {
          text-align: center;
          color: var(--color-muted);
          margin-bottom: 24px;
        }
        .final-warning {
          text-align: center;
          padding: 30px;
          background: #fff8f8;
          border: 1px solid #ffcccc;
          margin-bottom: 24px;
        }
        .final-warning p {
          margin-bottom: 8px;
          color: #cc0000;
        }
        .final-warning p:last-child {
          margin-bottom: 0;
          font-size: 0.875rem;
        }
        .form-actions {
          display: flex;
          gap: 12px;
        }
        .form-actions .btn {
          flex: 1;
        }
        .btn-danger {
          background: #dc3545;
          color: white;
          padding: 14px 28px;
          font-size: 0.9375rem;
          transition: background 0.2s;
        }
        .btn-danger:hover {
          background: #c82333;
        }
        .btn-danger:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
