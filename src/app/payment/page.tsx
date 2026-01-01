'use client';

import { useEffect, useState, Suspense } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useSearchParams } from 'next/navigation';

// API 개별 연동 테스트 키 (결제창 방식용)
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

interface TossPayment {
  requestPayment: (params: {
    method: string;
    amount: { currency: string; value: number };
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail?: string;
    customerName?: string;
    customerMobilePhone?: string;
    card?: {
      useEscrow: boolean;
      flowMode: string;
      useCardPoint: boolean;
      useAppCardOnly: boolean;
    };
  }) => Promise<void>;
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');
  const orderNameParam = searchParams.get('orderName');
  const initialAmount = amountParam ? parseInt(amountParam, 10) : 50000;
  const orderName = orderNameParam || '상품';

  const [payment, setPayment] = useState<TossPayment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount] = useState({
    currency: 'KRW',
    value: initialAmount,
  });
  const [customerKey] = useState(`customer_${Date.now()}`);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        // 일반 결제창 방식 (API 개별 연동 키 사용)
        const paymentInstance = tossPayments.payment({
          customerKey,
        });
        setPayment(paymentInstance as TossPayment);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching payment:', error);
        setIsLoading(false);
      }
    }

    fetchPayment();
  }, [customerKey]);

  const requestPayment = async () => {
    if (!payment) {
      return;
    }

    try {
      await payment.requestPayment({
        method: 'CARD', // 카드 및 간편결제
        amount: amount,
        orderId: `order-${Math.random().toString(36).substring(2, 12)}`,
        orderName: orderName,
        successUrl: window.location.origin + '/payment/success',
        failUrl: window.location.origin + '/payment/fail',
        customerEmail: 'customer@example.com',
        customerName: '고객',
        customerMobilePhone: '01012345678',
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT', // 통합결제창
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">Payment</h1>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="payment-container">
            <div className="payment-summary">
              <h2>주문 정보</h2>
              <div className="payment-summary-row">
                <span>상품명</span>
                <span>{orderName}</span>
              </div>
              <div className="payment-summary-row payment-summary-total">
                <span>결제 금액</span>
                <span>₩{amount.value.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="payment-info">
              <p>아래 버튼을 클릭하면 토스페이먼츠 결제창이 열립니다.</p>
              <p className="payment-info-sub">카드, 토스페이 등 다양한 결제수단을 선택할 수 있습니다.</p>
            </div>
            
            <button
              className="btn btn-primary payment-btn"
              onClick={requestPayment}
              disabled={isLoading}
            >
              {isLoading ? '결제 준비 중...' : `₩${amount.value.toLocaleString()} 결제하기`}
            </button>
            
            <p className="payment-notice">
              * 테스트 환경에서는 실제 결제가 이루어지지 않습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="page-content">
        <section className="section text-center">
          <p>결제 정보를 불러오는 중...</p>
        </section>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
