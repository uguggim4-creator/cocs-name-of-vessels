'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function OrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

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
        <h1 className="page-title">주문 내역</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="orders-container">
            <Link href="/mypage" className="back-link">← 마이페이지로 돌아가기</Link>

            <div className="empty-state">
              <p>주문 내역이 없습니다.</p>
              <Link href="/shop" className="btn btn-primary">
                쇼핑하러 가기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .loading-text {
          text-align: center;
          color: var(--color-muted);
          padding: 60px 0;
        }
        .orders-container {
          max-width: 800px;
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
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
        }
        .empty-state p {
          color: var(--color-muted);
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
}
