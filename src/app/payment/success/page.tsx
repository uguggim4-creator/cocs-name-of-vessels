'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const paymentKey = searchParams.get('paymentKey');

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem('cart');
    
    // Save order to history
    if (orderId && amount) {
      const order = {
        orderId,
        amount: parseInt(amount, 10),
        paymentKey,
        date: new Date().toISOString(),
        status: 'Paid'
      };

      const existingHistory = localStorage.getItem('orderHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      
      if (!history.some((o: { orderId: string }) => o.orderId === orderId)) {
        const newHistory = [order, ...history];
        localStorage.setItem('orderHistory', JSON.stringify(newHistory));
      }
    }
  }, [orderId, amount, paymentKey]);

  return (
    <div className="page-content">
      <section className="page-hero" style={{ background: 'var(--color-secondary)' }}>
        <h1 className="page-title">결제 완료</h1>
      </section>
      
      <section className="section">
        <div className="container text-center">
          <div className="success-icon">✓</div>
          <h2 style={{ marginBottom: '24px' }}>주문이 완료되었습니다</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '40px' }}>
            주문해 주셔서 감사합니다. 빠른 시일 내에 배송해 드리겠습니다.
          </p>
          
          <div className="order-info">
            <div className="order-info-row">
              <span>주문번호</span>
              <span>{orderId}</span>
            </div>
            <div className="order-info-row">
              <span>결제금액</span>
              <span>₩{Number(amount).toLocaleString()}</span>
            </div>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/shop" className="btn">
              쇼핑 계속하기
            </Link>
            <Link href="/" className="btn btn-primary">
              홈으로
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="page-content section text-center">로딩 중...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
