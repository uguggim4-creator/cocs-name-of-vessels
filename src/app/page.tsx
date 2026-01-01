import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: '높고 둥근 굽의 잔',
    nameEn: 'Tall Round-footed Cup',
    image: '/images/높고 둥근 굽의 잔 - 백색.jpg',
    price: null,
  },
  {
    id: 2,
    name: '유선 화병',
    nameEn: 'Streamlined Vase',
    image: '/images/유선화병.jpg',
    price: null,
  },
  {
    id: 3,
    name: '소경산수 화병',
    nameEn: 'Small Landscape Vase',
    image: '/images/바위 능선 화병.jpg',
    price: null,
  },
];

export default function Home() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero">
        <Image
          src="/images/메인 1.jpg"
          alt="Name of Vessel"
          fill
          className="hero-image"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Name of Vessel</h1>
          <p className="hero-subtitle">
            기물의 이름은 한국적 미의식을 동시대의 감각으로 재해석합니다.
          </p>
        </div>
      </section>

      {/* Products Section */}
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
                  <p className="product-price">{product.nameEn}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-40">
            <Link href="/shop" className="btn">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <h2 className="section-title">
            <span>Gallery</span>
            갤러리
          </h2>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <Image
                src="/images/메인 2.jpg"
                alt="Gallery 1"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/메인 3-1.jpg"
                alt="Gallery 2"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/메인 3-2.jpg"
                alt="Gallery 3"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section">
        <div className="container">
          <div className="about-section">
            <div className="about-image">
              <Image
                src="/images/1.jpg"
                alt="About Name of Vessel"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="about-content">
              <h2>기물의 이름</h2>
              <p>
                기물의 이름은 한국적 미의식을 동시대의 감각으로 재해석하여
                일상에서 사용할 수 있는 도자기를 만들고 있습니다.
              </p>
              <p>
                전통적인 기법과 현대적인 디자인의 조화를 통해
                시간이 지나도 변하지 않는 가치를 담아냅니다.
              </p>
              <Link href="/about" className="btn mt-40">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
