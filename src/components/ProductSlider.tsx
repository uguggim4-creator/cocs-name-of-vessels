'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import styles from './ProductSlider.module.css';

export default function ProductSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 330; // 카드 너비 + gap
      const currentScroll = sliderRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Featured Products</h2>
      
      <div className={styles.sliderWrapper}>
        <button 
          className={`${styles.arrowButton} ${styles.prevButton}`}
          onClick={() => scroll('left')}
          aria-label="Previous products"
        >
          ‹
        </button>

        <div className={styles.slider} ref={sliderRef}>
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/${product.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 240px, 300px"
                />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{product.name}</span>
                <span className={styles.enName}>{product.enName}</span>
                <span className={styles.price}>
                  ₩ {product.price.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <button 
          className={`${styles.arrowButton} ${styles.nextButton}`}
          onClick={() => scroll('right')}
          aria-label="Next products"
        >
          ›
        </button>
      </div>
    </section>
  );
}
