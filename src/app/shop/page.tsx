import Link from 'next/link';

const products = [
  {
    id: 1,
    name: '높고 둥근 굽의 잔 — 흑색',
    enName: 'High Round Footed Cup — Deep Black',
    price: 58000,
    image: '/images/높고 둥근 굽의 잔 - 흑색.jpg'
  },
  {
    id: 2,
    name: '높고 둥근 굽의 잔 — 백색',
    enName: 'High Round Footed Cup — Porcelain White',
    price: 58000,
    image: '/images/높고 둥근 굽의 잔 - 백색.jpg'
  },
  {
    id: 3,
    name: '유선 화병 — 석문 청자',
    enName: 'Flowing Line Vase — Stone Celadon',
    price: 55000,
    image: '/images/유선화병.jpg'
  },
  {
    id: 4,
    name: '유선 화병 — 점문 청자',
    enName: 'Flowing Line Vase — Dot Celadon',
    price: 55000,
    image: '/images/유선화병.jpg'
  },
  {
    id: 5,
    name: '난초줄기 화병 — 흑록색',
    enName: 'Orchid Stem Vase — Deep Blackish Green',
    price: 110000,
    image: '/images/난초줄기화병.jpg'
  },
  {
    id: 6,
    name: '바위 능선 화병 — 흑록색',
    enName: 'Rock Ridge Vase — Deep Blackish Green',
    price: 90000,
    image: '/images/바위 능선 화병.jpg'
  },
  {
    id: 7,
    name: '바위 능선 화병 — 토황색',
    enName: 'Rock Ridge Vase — Earth Ochre',
    price: 90000,
    image: '/images/바위 능선 화병.jpg'
  },
  {
    id: 8,
    name: '작은 봉우리 화병 — 흑록색',
    enName: 'Small Peak Vase — Deep Blackish Green',
    price: 60000,
    image: '/images/작은 봉우리 화병.jpg'
  },
  {
    id: 9,
    name: '작은 봉우리 화병 — 석간주색',
    enName: 'Small Peak Vase — Red Ochre',
    price: 60000,
    image: '/images/작은 봉우리 화병.jpg'
  },
];

export default function Shop() {
  return (
    <div className="shop-container">
      <h2 className="page-title">All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>{product.enName}</p>
              <p>₩ {product.price.toLocaleString()}</p>
              <Link 
                href={`/payment?amount=${product.price}&orderName=${encodeURIComponent(product.name)}`} 
                style={{ display: 'inline-block', marginTop: '10px', padding: '5px 10px', backgroundColor: '#333', color: '#fff', borderRadius: '4px' }}
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
