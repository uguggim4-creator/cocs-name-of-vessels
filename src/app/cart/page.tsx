'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalAmount } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Your cart is empty</h2>
        <Link href="/shop" style={{ textDecoration: 'underline' }}>Continue Shopping</Link>
      </div>
    );
  }

  const orderName = cart.length === 1 
    ? cart[0].name 
    : `${cart[0].name} 외 ${cart.length - 1}건`;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: "'Noto Serif KR', serif" }}>Shopping Cart</h1>
      
      <div style={{ borderTop: '1px solid #eee' }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', marginRight: '20px' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.enName}</p>
            </div>
            <div style={{ margin: '0 20px' }}>
              {item.quantity} x ₩ {item.price.toLocaleString()}
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '0.9rem' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Total: <span style={{ fontWeight: 'bold' }}>₩ {totalAmount.toLocaleString()}</span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            onClick={clearCart}
            style={{ padding: '10px 20px', border: '1px solid #ddd', background: 'none', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
          <Link 
            href={`/payment?amount=${totalAmount}&orderName=${encodeURIComponent(orderName)}`}
            style={{ 
              padding: '10px 30px', 
              backgroundColor: '#111', 
              color: '#fff', 
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
