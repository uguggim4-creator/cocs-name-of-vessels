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
      
      // Avoid duplicates
      if (!history.some((o: any) => o.orderId === orderId)) {
        const newHistory = [order, ...history];
        localStorage.setItem('orderHistory', JSON.stringify(newHistory));
      }
      
      // Clear cart after successful payment
      localStorage.removeItem('cart');
    }
  }, [orderId, amount, paymentKey]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">결제 성공</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="mb-2"><strong>주문번호:</strong> {orderId}</p>
        <p className="mb-2"><strong>결제금액:</strong> {Number(amount).toLocaleString()}원</p>
        <p className="mb-4"><strong>Payment Key:</strong> {paymentKey}</p>
        <Link href="/shop" className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          쇼핑 계속하기
        </Link>
        <Link href="/mypage" className="block w-full text-center mt-2 text-gray-600 hover:underline">
          주문 내역 확인하기
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
