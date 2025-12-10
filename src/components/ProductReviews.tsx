'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Review {
  id: number;
  userId: string;
  userEmail: string;
  rating: number;
  text: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load reviews from localStorage
    const allReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    const productReviews = allReviews[productId] || [];
    setReviews(productReviews);

    // Check auth
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!newReview.trim()) return;

    const review: Review = {
      id: Date.now(),
      userId: user.id,
      userEmail: user.email,
      rating,
      text: newReview,
      date: new Date().toISOString(),
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);

    // Save to localStorage
    const allReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    allReviews[productId] = updatedReviews;
    localStorage.setItem('productReviews', JSON.stringify(allReviews));

    setNewReview('');
    setRating(5);
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>

      {/* Review Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block mb-2 font-medium">별점</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="p-2 border rounded"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">리뷰 작성</label>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-3 border rounded h-24"
              placeholder="이 상품에 대한 솔직한 리뷰를 남겨주세요."
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            리뷰 등록
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 rounded text-center">
          <p>리뷰를 작성하려면 <a href="/login" className="text-blue-500 underline">로그인</a>이 필요합니다.</p>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">아직 작성된 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold mr-2">{review.userEmail.split('@')[0]}***</span>
                  <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}