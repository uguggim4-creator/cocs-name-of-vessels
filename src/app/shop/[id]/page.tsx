'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page-content">
        <div className="container section text-center">
          <h1>상품을 찾을 수 없습니다</h1>
          <Link href="/shop" className="btn mt-40">
            Shop으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/cart';
  };

  return (
    <div className="page-content">
      <section className="section">
        <div className="container">
          <div className="product-detail">
            <div className="product-detail-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="product-detail-info">
              <p className="product-detail-category">{product.category === 'cup' ? 'Cup' : 'Vase'}</p>
              <h1 className="product-detail-name">{product.name}</h1>
              <p className="product-detail-name-en">{product.nameEn}</p>
              <p className="product-detail-price">₩{product.price.toLocaleString()}</p>
              
              <div className="product-detail-description">
                <p>{product.description}</p>
              </div>

              <div className="product-detail-quantity">
                <span>수량</span>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-detail-total">
                <span>총 금액</span>
                <span className="total-price">₩{(product.price * quantity).toLocaleString()}</span>
              </div>

              <div className="product-detail-actions">
                <button 
                  onClick={handleAddToCart} 
                  className="btn"
                  disabled={added}
                >
                  {added ? '장바구니에 담김 ✓' : '장바구니 담기'}
                </button>
                <button onClick={handleBuyNow} className="btn btn-primary">
                  바로 구매
                </button>
              </div>

              <div className="product-detail-info-list">
                <p><strong>배송 안내</strong></p>
                <p>• 주문 후 3-5일 내 발송</p>
                <p>• 핸드메이드 제품으로 미세한 차이가 있을 수 있습니다</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
