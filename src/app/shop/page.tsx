import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';

export default function ShopPage() {
  return (
    <div className="page-content">
      {/* Page Hero */}
      <section className="page-hero">
        <h1 className="page-title">Shop</h1>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            <span>Collection</span>
            작품
          </h2>
          <div className="product-grid">
            {products.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="product-card">
                <div className="product-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₩{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
