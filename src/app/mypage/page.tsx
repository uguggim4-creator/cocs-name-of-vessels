'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function MyPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
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

  const menuItems = [
    { href: '/mypage/profile', label: '프로필 수정', description: '이름, 연락처 변경' },
    { href: '/mypage/password', label: '비밀번호 변경', description: '비밀번호 재설정' },
    { href: '/mypage/address', label: '배송지 관리', description: '배송지 추가 및 관리' },
    { href: '/mypage/orders', label: '주문 내역', description: '주문 및 배송 현황' },
    { href: '/mypage/withdraw', label: '회원 탈퇴', description: '계정 삭제' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">My Page</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="mypage-container">
            <div className="mypage-header">
              <div className="user-info">
                <p className="user-name">{user.user_metadata?.name || '회원'}님</p>
                <p className="user-email">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                로그아웃
              </button>
            </div>

            <nav className="mypage-menu">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} className="mypage-menu-item">
                  <div className="menu-item-content">
                    <span className="menu-item-label">{item.label}</span>
                    <span className="menu-item-desc">{item.description}</span>
                  </div>
                  <span className="menu-item-arrow">→</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <style jsx>{`
        .loading-text {
          text-align: center;
          color: var(--color-muted);
          padding: 60px 0;
        }
        .mypage-container {
          max-width: 600px;
          margin: 0 auto;
        }
        .mypage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          margin-bottom: 30px;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .user-name {
          font-size: 1.25rem;
          font-weight: 500;
        }
        .user-email {
          color: var(--color-muted);
          font-size: 0.875rem;
        }
        .mypage-menu {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--color-border);
          background: var(--color-white);
        }
        .mypage-menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-border);
          transition: background 0.2s;
        }
        .mypage-menu-item:last-child {
          border-bottom: none;
        }
        .mypage-menu-item:hover {
          background: var(--color-background);
        }
        .menu-item-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .menu-item-label {
          font-weight: 500;
        }
        .menu-item-desc {
          font-size: 0.875rem;
          color: var(--color-muted);
        }
        .menu-item-arrow {
          color: var(--color-muted);
        }
      `}</style>
    </div>
  );
}
