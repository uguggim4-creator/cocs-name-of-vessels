'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/products';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import ProductReviews from '@/components/ProductReviews';
import { notFound } from 'next/navigation';

export default function ClientProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const found = localProducts.find((p: Product) => p.id.toString() === id);
    
    if (found) {
      setProduct(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!product) {
    return <div className="p-10 text-center">Product not found.</div>;
  }

  return (
    <div className="product-detail-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '60px' }}>
        <div className="product-image-section" style={{ flex: '1 1 400px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
        <div className="product-info-section" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px', fontFamily: "'Noto Serif KR', serif" }}>{product.name}</h1>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '20px' }}>{product.enName}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px' }}>₩ {product.price.toLocaleString()}</p>
          
          <div className="product-description" style={{ marginBottom: '40px', lineHeight: '1.8', color: '#444' }}>
            <p>{product.description}</p>
          </div>

          <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
            <Link 
              href={`/payment?amount=${product.price}&orderName=${encodeURIComponent(product.name)}`}
              style={{ 
                flex: 1, 
                padding: '15px', 
                backgroundColor: '#111', 
                color: '#fff', 
                textAlign: 'center', 
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              BUY NOW
            </Link>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      
      <ProductReviews productId={product.id} />
    </div>
  );
}