'use client';

import Link from 'next/link';
import { products as initialProducts, Product } from '@/lib/products';
import { useState, useEffect } from 'react';

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    if (localProducts.length > 0) {
      setAllProducts([...initialProducts, ...localProducts]);
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(allProducts.map((p) => p.category)))];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.enName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 className="page-title" style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: "'Noto Serif KR', serif", textAlign: 'center' }}>All Products</h2>
      
      <div className="filters" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                marginRight: '15px',
                padding: '8px 16px',
                border: selectedCategory === category ? '1px solid #333' : '1px solid transparent',
                backgroundColor: selectedCategory === category ? '#333' : 'transparent',
                color: selectedCategory === category ? '#fff' : '#666',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '250px'
            }}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          No products found.
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
}
