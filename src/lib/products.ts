export interface Product {
  id: number;
  name: string;
  enName: string;
  price: number;
  image: string;
  description?: string; // Added description field for detail page
}

export const products: Product[] = [
  {
    id: 1,
    name: '높고 둥근 굽의 잔 — 흑색',
    enName: 'High Round Footed Cup — Deep Black',
    price: 58000,
    image: '/images/높고 둥근 굽의 잔 - 흑색.jpg',
    description: '깊은 검은색의 유약이 돋보이는 높고 둥근 굽의 잔입니다. 차나 술을 즐기기에 적합한 크기와 형태를 가지고 있습니다.'
  },
  {
    id: 2,
    name: '높고 둥근 굽의 잔 — 백색',
    enName: 'High Round Footed Cup — Porcelain White',
    price: 58000,
    image: '/images/높고 둥근 굽의 잔 - 백색.jpg',
    description: '순수한 백색의 아름다움을 담은 높고 둥근 굽의 잔입니다. 단아한 형태가 돋보입니다.'
  },
  {
    id: 3,
    name: '유선 화병 — 석문 청자',
    enName: 'Flowing Line Vase — Stone Celadon',
    price: 55000,
    image: '/images/유선화병.jpg',
    description: '돌의 질감을 닮은 청자 유약과 유려한 선이 어우러진 화병입니다.'
  },
  {
    id: 4,
    name: '유선 화병 — 점문 청자',
    enName: 'Flowing Line Vase — Dot Celadon',
    price: 55000,
    image: '/images/유선화병.jpg',
    description: '점문 무늬가 특징인 청자 화병으로, 꽃을 꽂았을 때 더욱 돋보입니다.'
  },
  {
    id: 5,
    name: '난초줄기 화병 — 흑록색',
    enName: 'Orchid Stem Vase — Deep Blackish Green',
    price: 110000,
    image: '/images/난초줄기화병.jpg',
    description: '난초의 줄기를 형상화한 독특한 디자인의 화병입니다. 깊은 흑록색이 중후한 멋을 더합니다.'
  },
  {
    id: 6,
    name: '바위 능선 화병 — 흑록색',
    enName: 'Rock Ridge Vase — Deep Blackish Green',
    price: 90000,
    image: '/images/바위 능선 화병.jpg',
    description: '바위의 거친 능선을 표현한 화병입니다. 자연의 웅장함을 담고 있습니다.'
  },
  {
    id: 7,
    name: '바위 능선 화병 — 토황색',
    enName: 'Rock Ridge Vase — Earth Ochre',
    price: 90000,
    image: '/images/바위 능선 화병.jpg',
    description: '흙의 따뜻한 색감을 담은 바위 능선 화병입니다.'
  },
  {
    id: 8,
    name: '작은 봉우리 화병 — 흑록색',
    enName: 'Small Peak Vase — Deep Blackish Green',
    price: 60000,
    image: '/images/작은 봉우리 화병.jpg',
    description: '작은 산봉우리를 닮은 귀여운 화병입니다. 작은 꽃 한 송이를 꽂기에 좋습니다.'
  },
  {
    id: 9,
    name: '작은 봉우리 화병 — 석간주색',
    enName: 'Small Peak Vase — Red Ochre',
    price: 60000,
    image: '/images/작은 봉우리 화병.jpg',
    description: '붉은 흙의 기운을 담은 석간주색 화병입니다.'
  },
];
