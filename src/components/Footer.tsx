import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>CLIENT SERVICE</h4>
          <ul>
            <li><Link href="#">Account</Link></li>
            <li><Link href="#">Orders</Link></li>
            <li><Link href="#">Returns</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>LEGAL</h4>
          <ul>
            <li><Link href="#">Terms of Use</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>FOLLOW</h4>
          <ul>
            <li><Link href="#">Instagram</Link></li>
            <li><Link href="#">Facebook</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>CUSTOMER CENTER</h4>
          <p>Mon-Fri 10:00 - 17:00</p>
          <p>info@vessels.com</p>
        </div>
      </div>
      <div className="copyright">
        &copy; 2025 기물의 이름. All rights reserved.
      </div>
    </footer>
  );
}
