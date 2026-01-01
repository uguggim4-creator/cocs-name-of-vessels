'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="page-content">
        <section className="page-hero">
          <h1 className="page-title">Cart</h1>
        </section>
        <section className="section text-center">
          <div className="container">
            <p style={{ marginBottom: '40px', color: 'var(--color-muted)' }}>
              장바구니가 비어있습니다
            </p>
            <Link href="/shop" className="btn">
              쇼핑 계속하기
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">Cart</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="cart-container">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-image">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.product.name}</h3>
                    <p className="cart-item-price">₩{item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₩{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="cart-item-remove"
                    aria-label="삭제"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>주문 요약</h3>
              <div className="cart-summary-row">
                <span>상품 금액</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row">
                <span>배송비</span>
                <span>무료</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>총 결제금액</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
              <Link 
                href={`/payment?amount=${totalPrice}&orderName=${encodeURIComponent(items[0].product.name + (items.length > 1 ? ` 외 ${items.length - 1}건` : ''))}`}
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                결제하기
              </Link>
              <button 
                onClick={clearCart}
                className="btn"
                style={{ width: '100%', marginTop: '12px' }}
              >
                장바구니 비우기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
