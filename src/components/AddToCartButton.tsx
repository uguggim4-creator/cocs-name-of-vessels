'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to cart!');
  };

  return (
    <button 
      onClick={handleAddToCart}
      style={{ 
        flex: 1, 
        padding: '15px', 
        backgroundColor: '#fff', 
        color: '#111', 
        border: '1px solid #111',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500'
      }}
    >
      ADD TO CART
    </button>
  );
}
