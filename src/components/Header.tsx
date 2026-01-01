'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          Name of Vessel
        </Link>
        
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/cart" className="header-cart">
            Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {user ? (
            <div className="header-user">
              <Link href="/mypage" className="header-username">
                {user.user_metadata?.name || user.email?.split('@')[0]}
              </Link>
              <button onClick={logout} className="header-logout">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="header-login">Login</Link>
          )}
        </div>

        <button className="mobile-menu-btn" aria-label="메뉴 열기">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
