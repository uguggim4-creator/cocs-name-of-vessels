'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ProductSlider from '@/components/ProductSlider';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.splitScreen}>
        {/* Left Side: Vase Collection */}
        <Link href="/shop?category=vase" className={styles.splitItem}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/메인 3-1.jpg"
              alt="Vase Collection"
              fill
              className={styles.image}
              priority
            />
          </div>
          <div className={styles.content}>
            <span className={styles.category}>Collection 01</span>
            <h2 className={styles.title}>The Vase</h2>
            <p className={styles.description}>
              곡선의 미학이 담긴 화병 컬렉션을 만나보세요.<br />
              공간에 우아함을 더해주는 오브제입니다.
            </p>
            <span className={styles.button}>View Collection</span>
          </div>
        </Link>

        {/* Right Side: Cup Collection */}
        <Link href="/shop?category=cup" className={styles.splitItem}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/메인 3-2.jpg"
              alt="Cup Collection"
              fill
              className={styles.image}
              priority
            />
          </div>
          <div className={styles.content}>
            <span className={styles.category}>Collection 02</span>
            <h2 className={styles.title}>The Cup</h2>
            <p className={styles.description}>
              일상의 온기를 전하는 컵 컬렉션입니다.<br />
              손끝에 닿는 감촉까지 생각했습니다.
            </p>
            <span className={styles.button}>View Collection</span>
          </div>
        </Link>
      </div>

      {/* Product Slider Section */}
      <ProductSlider />
    </div>
  );
}

