'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function FailContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const code = searchParams.get('code');

  return (
    <div className="page-content">
      <section className="page-hero" style={{ background: '#c0392b' }}>
        <h1 className="page-title">결제 실패</h1>
      </section>
      
      <section className="section">
        <div className="container text-center">
          <div className="fail-icon">✕</div>
          <h2 style={{ marginBottom: '24px' }}>결제에 실패했습니다</h2>
          
          <div className="order-info">
            <div className="order-info-row">
              <span>에러 코드</span>
              <span>{code || 'UNKNOWN'}</span>
            </div>
            <div className="order-info-row">
              <span>에러 메시지</span>
              <span>{message || '알 수 없는 오류가 발생했습니다'}</span>
            </div>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/cart" className="btn">
              장바구니로 돌아가기
            </Link>
            <Link href="/shop" className="btn btn-primary">
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={<div className="page-content section text-center">로딩 중...</div>}>
      <FailContent />
    </Suspense>
  );
}
