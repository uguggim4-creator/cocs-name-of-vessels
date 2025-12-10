import Link from 'next/link';
import { products } from '@/lib/products';

export default function Shop() {
  return (
    <div className="shop-container">
      <h2 className="page-title">All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <Link href={`/shop/${product.id}`} className="product-link">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>{product.enName}</p>
                <p>₩ {product.price.toLocaleString()}</p>
              </div>
            </Link>
            <div style={{ padding: '0 15px 15px' }}>
               <Link 
                href={`/payment?amount=${product.price}&orderName=${encodeURIComponent(product.name)}`} 
                style={{ display: 'inline-block', width: '100%', textAlign: 'center', padding: '8px 0', backgroundColor: '#333', color: '#fff', borderRadius: '0', textDecoration: 'none', fontSize: '0.9rem' }}
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
