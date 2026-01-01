import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">Name of Vessel</h3>
            <p className="footer-desc">
              기물의 이름은 한국적 미의식을 동시대의 감각으로 재해석합니다.
            </p>
          </div>

          <div className="footer-nav">
            <h4>Menu</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>기물의 이름 (Name of Vessel)</p>
            <p>대표: 박채원</p>
            <p>서울특별시 성북구 동소문로11길 44 1층</p>
            <p>chaewon@nameofvessel.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Name of Vessel. All rights reserved.</p>
          <p>기물의 이름</p>
        </div>
      </div>
    </footer>
  );
}
