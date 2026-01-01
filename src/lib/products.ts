export interface Product {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: 'cup' | 'vase';
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: '높고 둥근 굽의 잔 - 백색',
    nameEn: 'Tall Round-footed Cup - White',
    description: '전통적인 굽의 형태를 현대적으로 재해석한 잔입니다. 높고 둥근 굽이 안정감을 주며, 백색 유약이 부드러운 질감을 더합니다.',
    price: 58000,
    image: '/images/높고 둥근 굽의 잔 - 백색.jpg',
    images: ['/images/높고 둥근 굽의 잔 - 백색.jpg'],
    category: 'cup',
    inStock: true,
  },
  {
    id: 2,
    name: '높고 둥근 굽의 잔 - 흑색',
    nameEn: 'Tall Round-footed Cup - Black',
    description: '전통적인 굽의 형태를 현대적으로 재해석한 잔입니다. 흑유의 깊은 색감이 고급스러운 분위기를 연출합니다.',
    price: 58000,
    image: '/images/높고 둥근 굽의 잔 - 흑색.jpg',
    images: ['/images/높고 둥근 굽의 잔 - 흑색.jpg'],
    category: 'cup',
    inStock: true,
  },
  {
    id: 3,
    name: '유선 화병',
    nameEn: 'Streamlined Vase',
    description: '물 흐르는 듯한 곡선이 특징인 화병입니다. 유려한 선이 공간에 우아함을 더해줍니다.',
    price: 120000,
    image: '/images/유선화병.jpg',
    images: ['/images/유선화병.jpg'],
    category: 'vase',
    inStock: true,
  },
  {
    id: 4,
    name: '바위 능선 화병',
    nameEn: 'Rock Ridge Vase',
    description: '산의 능선을 형상화한 화병입니다. 자연의 힘찬 기운을 담아 공간에 생명력을 불어넣습니다.',
    price: 150000,
    image: '/images/바위 능선 화병.jpg',
    images: ['/images/바위 능선 화병.jpg'],
    category: 'vase',
    inStock: true,
  },
  {
    id: 5,
    name: '난초줄기 화병',
    nameEn: 'Orchid Stem Vase',
    description: '난초의 줄기처럼 가늘고 우아한 형태의 화병입니다. 한 송이 꽃을 위한 완벽한 그릇입니다.',
    price: 85000,
    image: '/images/난초줄기화병.jpg',
    images: ['/images/난초줄기화병.jpg'],
    category: 'vase',
    inStock: true,
  },
  {
    id: 6,
    name: '작은 봉우리 화병',
    nameEn: 'Small Peak Vase',
    description: '산봉우리를 닮은 작은 화병입니다. 아담한 크기로 어디든 어울립니다.',
    price: 75000,
    image: '/images/작은 봉우리 화병.jpg',
    images: ['/images/작은 봉우리 화병.jpg'],
    category: 'vase',
    inStock: true,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: 'cup' | 'vase'): Product[] {
  return products.filter((p) => p.category === category);
}
