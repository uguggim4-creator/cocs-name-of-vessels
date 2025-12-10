'use client';

import { useEffect, useState, Suspense } from 'react';
import { loadTossPayments, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { useSearchParams } from 'next/navigation';

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const customerKey = 'test_customer_key';

function PaymentContent() {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');
  const initialAmount = amountParam ? parseInt(amountParam, 10) : 50000;

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: initialAmount,
  });

  useEffect(() => {
    setAmount({ currency: 'KRW', value: initialAmount });
  }, [initialAmount]);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({
          customerKey,
        });
        setWidgets(widgets);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      await widgets.setAmount(amount);

      await widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });

      await widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });
    }

    renderPaymentWidgets();
  }, [widgets, amount]);

  const requestPayment = async () => {
    if (!widgets) {
      return;
    }

    try {
      await widgets.requestPayment({
        orderId: `order-${Math.random().toString(36).substring(2, 12)}`,
        orderName: '토스 티셔츠 외 2건',
        successUrl: window.location.origin + '/payment/success',
        failUrl: window.location.origin + '/payment/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01012341234',
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  return (
    <div className="wrapper w-full max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-10">주문서</h1>
      <p className="text-xl mb-5">결제 금액: {amount.value.toLocaleString()}원</p>
      <div id="payment-method" />
      <div id="agreement" />
      <button
        className="button w-full bg-blue-500 text-white py-3 rounded-lg mt-5 hover:bg-blue-600 transition-colors"
        onClick={requestPayment}
      >
        결제하기
      </button>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
