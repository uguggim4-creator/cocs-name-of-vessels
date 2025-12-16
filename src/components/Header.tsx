'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const menuData = {
  shop: [
    { label: '전체상품', href: '/shop' },
    { label: '오브제류', href: '/shop?category=objet' },
    { label: '패브릭류', href: '/shop?category=fabric' },
    { label: '식기류', href: '/shop?category=tableware' },
    { label: '어린류', href: '/shop?category=kids' },
    { label: '그 외', href: '/shop?category=etc' },
  ],
  portfolio: [
    { label: '전체작품', href: '/portfolio' },
    { label: 'Exhibition', href: '/portfolio?type=exhibition' },
    { label: 'Lookbook', href: '/portfolio?type=lookbook' },
    { label: 'Press', href: '/portfolio?type=press' },
  ],
  about: [
    { label: 'Story', href: '/about?section=story' },
    { label: 'Contact', href: '/about?section=contact' },
    { label: 'Stockist', href: '/about?section=stockist' },
  ],
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header 
      className={`${styles.header} ${isDropdownOpen ? styles.headerOpen : ''} ${isScrolled ? styles.scrolled : ''}`}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <nav 
        className={styles.navGroup}
        onMouseEnter={() => setIsDropdownOpen(true)}
      >
        <Link href="/shop" className={styles.link}>SHOP</Link>
        <Link href="/portfolio" className={styles.link}>PORTFOLIO</Link>
        <Link href="/about" className={styles.link}>ABOUT</Link>
      </nav>
      
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          Name of Vessels
        </Link>
      </div>

      <nav className={`${styles.navGroup} ${styles.right}`}>
        <Link href="/cart" className={styles.link}>CART</Link>
        {user ? (
          <>
            <Link href="/mypage" className={styles.link}>MY PAGE</Link>
            <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>
              LOGOUT
            </button>
          </>
        ) : (
          <Link href="/login" className={styles.link}>LOGIN</Link>
        )}
      </nav>

      {/* Full Dropdown Menu */}
      {isDropdownOpen && (
        <div className={styles.fullDropdown}>
          <div className={styles.dropdownContent}>
            <div className={styles.dropdownColumn}>
              <h3 className={styles.dropdownTitle}>SHOP</h3>
              {menuData.shop.map((item) => (
                <Link key={item.href} href={item.href} className={styles.dropdownLink}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className={styles.dropdownColumn}>
              <h3 className={styles.dropdownTitle}>PORTFOLIO</h3>
              {menuData.portfolio.map((item) => (
                <Link key={item.href} href={item.href} className={styles.dropdownLink}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className={styles.dropdownColumn}>
              <h3 className={styles.dropdownTitle}>ABOUT</h3>
              {menuData.about.map((item) => (
                <Link key={item.href} href={item.href} className={styles.dropdownLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
