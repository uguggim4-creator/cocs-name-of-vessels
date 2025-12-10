'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navGroup}>
        <Link href="/shop" className={styles.link}>SHOP</Link>
        <Link href="/about" className={styles.link}>ABOUT</Link>
      </nav>
      
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          기물의 이름
        </Link>
      </div>

      <nav className={`${styles.navGroup} ${styles.right}`}>
        <Link href="/journal" className={styles.link}>JOURNAL</Link>
        <Link href="/contact" className={styles.link}>CONTACT</Link>
        {user ? (
          <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>
            LOGOUT
          </button>
        ) : (
          <Link href="/login" className={styles.link}>LOGIN</Link>
        )}
      </nav>
    </header>
  );
}
