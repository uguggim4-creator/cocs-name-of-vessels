'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

interface Profile {
  name: string;
  phone: string;
}

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({ name: '', phone: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, phone')
        .eq('id', user!.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }

      if (data) {
        setProfile({
          name: data.name || '',
          phone: data.phone || '',
        });
      } else {
        // 프로필이 없으면 user_metadata에서 가져오기
        setProfile({
          name: user!.user_metadata?.name || '',
          phone: '',
        });
      }
    } catch (err) {
      console.error('Error:', err);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user!.id,
          name: profile.name,
          phone: profile.phone,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        setError('프로필 저장에 실패했습니다.');
        console.error('Error saving profile:', error);
      } else {
        // user_metadata도 업데이트
        await supabase.auth.updateUser({
          data: { name: profile.name },
        });
        setMessage('프로필이 저장되었습니다.');
      }
    } catch (err) {
      setError('프로필 저장 중 오류가 발생했습니다.');
    }

    setIsSaving(false);
  };

  if (authLoading || isLoading) {
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
        <h1 className="page-title">프로필 수정</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-container">
            <Link href="/mypage" className="back-link">← 마이페이지로 돌아가기</Link>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={user.email || ''}
                  disabled
                  className="input-disabled"
                />
                <p className="form-hint">이메일은 변경할 수 없습니다.</p>
              </div>

              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">연락처</label>
                <input
                  type="tel"
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="연락처를 입력하세요"
                />
              </div>

              {error && <p className="form-error">{error}</p>}
              {message && <p className="form-success">{message}</p>}

              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? '저장 중...' : '저장하기'}
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
        .input-disabled {
          background: var(--color-background);
          color: var(--color-muted);
          cursor: not-allowed;
        }
        .form-hint {
          font-size: 0.75rem;
          color: var(--color-muted);
          margin-top: 4px;
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
