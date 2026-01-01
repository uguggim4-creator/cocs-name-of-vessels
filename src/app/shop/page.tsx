import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: '높고 둥근 굽의 잔 - 백색',
    nameEn: 'Tall Round-footed Cup - White',
    image: '/images/높고 둥근 굽의 잔 - 백색.jpg',
    price: null,
    category: 'cup',
  },
  {
    id: 2,
    name: '높고 둥근 굽의 잔 - 흑색',
    nameEn: 'Tall Round-footed Cup - Black',
    image: '/images/높고 둥근 굽의 잔 - 흑색.jpg',
    price: null,
    category: 'cup',
  },
  {
    id: 3,
    name: '유선 화병',
    nameEn: 'Streamlined Vase',
    image: '/images/유선화병.jpg',
    price: null,
    category: 'vase',
  },
  {
    id: 4,
    name: '바위 능선 화병',
    nameEn: 'Rock Ridge Vase',
    image: '/images/바위 능선 화병.jpg',
    price: null,
    category: 'vase',
  },
  {
    id: 5,
    name: '난초줄기 화병',
    nameEn: 'Orchid Stem Vase',
    image: '/images/난초줄기화병.jpg',
    price: null,
    category: 'vase',
  },
  {
    id: 6,
    name: '작은 봉우리 화병',
    nameEn: 'Small Peak Vase',
    image: '/images/작은 봉우리 화병.jpg',
    price: null,
    category: 'vase',
  },
];

export default function ShopPage() {
  return (
    <div className="page-content">
      {/* Page Hero */}
      <section className="page-hero">
        <h1 className="page-title">Shop</h1>
      </section>

      {/* Products */}
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
        </div>
      </section>
    </div>
  );
}
