'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function FailContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const code = searchParams.get('code');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-red-600">결제 실패</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="mb-2"><strong>에러 코드:</strong> {code}</p>
        <p className="mb-4"><strong>에러 메시지:</strong> {message}</p>
        <Link href="/payment" className="block w-full text-center bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
          다시 시도하기
        </Link>
      </div>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailContent />
    </Suspense>
  );
}
