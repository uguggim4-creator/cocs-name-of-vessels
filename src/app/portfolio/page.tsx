import Image from 'next/image';
import Link from 'next/link';

const portfolioItems = [
  {
    id: 1,
    title: '높고 둥근 굽의 잔',
    titleEn: 'Tall Round-footed Cup',
    image: '/images/높고 둥근 굽의 잔 - 백색.jpg',
    year: '2024',
  },
  {
    id: 2,
    title: '유선 화병',
    titleEn: 'Streamlined Vase',
    image: '/images/유선화병.jpg',
    year: '2024',
  },
  {
    id: 3,
    title: '소경산수 화병 시리즈',
    titleEn: 'Small Landscape Vase Series',
    image: '/images/바위 능선 화병.jpg',
    year: '2024',
  },
  {
    id: 4,
    title: '난초줄기 화병',
    titleEn: 'Orchid Stem Vase',
    image: '/images/난초줄기화병.jpg',
    year: '2023',
  },
  {
    id: 5,
    title: '작은 봉우리 화병',
    titleEn: 'Small Peak Vase',
    image: '/images/작은 봉우리 화병.jpg',
    year: '2023',
  },
];

export default function PortfolioPage() {
  return (
    <div className="page-content">
      {/* Page Hero */}
      <section className="page-hero">
        <h1 className="page-title">Portfolio</h1>
      </section>

      {/* Portfolio Grid */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            <span>Works</span>
            작업
          </h2>
          <div className="gallery-grid">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`gallery-item ${index === 0 ? 'large' : ''}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-center">
        <div className="container">
          <h2 className="section-title">
            <span>Contact</span>
            문의하기
          </h2>
          <p style={{ marginBottom: '40px', color: 'var(--color-muted)' }}>
            작품에 대한 문의나 커스텀 주문은 이메일로 연락주세요.
          </p>
          <a href="mailto:chaewon@nameofvessel.com" className="btn">
            chaewon@nameofvessel.com
          </a>
        </div>
      </section>
    </div>
  );
}
