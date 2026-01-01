'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    id: 1,
    image: '/images/메인 1.jpg',
    alt: 'Name of Vessel - 메인',
  },
  {
    id: 2,
    image: '/images/메인 2.jpg',
    alt: 'Name of Vessel - 갤러리',
  },
  {
    id: 3,
    image: '/images/메인 3-1.jpg',
    alt: 'Name of Vessel - 작품',
  },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="page-content">
      {/* Hero Section with Slider */}
      <section className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="hero-image"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Name of Vessel</h1>
          <p className="hero-subtitle">
            기물의 이름은 한국적 미의식을 동시대의 감각으로 재해석합니다.
          </p>
        </div>
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
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

      {/* Brand Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-bg">
          <Image
            src="/images/2.jpg"
            alt="Brand Philosophy"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="philosophy-overlay" />
        </div>
        <div className="philosophy-content">
          <p className="philosophy-tagline">Name of Vessel</p>
          <h2 className="philosophy-slogan">
            한국적 미의식을<br />동시대의 감각으로 다시 해석합니다
          </h2>
          <p className="philosophy-desc">
            사람과 자연이 함께 만들어온 질서처럼,<br />
            기물의 형에 깃든 선의 흐름과 자연이 머금은 농담의 색을 통해<br />
            우리 곁에서 조용히 오래 머물러온 것들에게 이름을 부여합니다.
          </p>
          <div className="philosophy-values">
            <div className="philosophy-value">
              <span className="value-char">形</span>
              <h3>전통의 재해석</h3>
              <p>형태에 깃든 선을 읽다</p>
            </div>
            <div className="philosophy-value">
              <span className="value-char">手</span>
              <h3>장인의 손길</h3>
              <p>작가의 손에서 탄생하다</p>
            </div>
            <div className="philosophy-value">
              <span className="value-char">時</span>
              <h3>시간의 깊이</h3>
              <p>곁에서 오래 함께하다</p>
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

      {/* Vessel Stories Section */}
      <section className="section stories-section">
        <div className="container">
          <div className="stories-header">
            <h2 className="section-title">
              <span>Stories</span>
              작품 이야기
            </h2>
            <Link href="/portfolio" className="stories-view-all">
              View All
            </Link>
          </div>
          <div className="stories-grid">
            <article className="story-card">
              <div className="story-image">
                <Image
                  src="/images/높고 둥근 굽의 잔 - 백색.jpg"
                  alt="높고 둥근 굽의 잔"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="story-content">
                <span className="story-category">이야기</span>
                <h3 className="story-title">높고 둥근 굽의 잔</h3>
                <p className="story-excerpt">
                  굽을 구형으로 확장하여, 기물이 지면에서 가볍게 떠오르는 인상을 통해 전통의 조형 감각을 담았습니다.
                </p>
              </div>
            </article>
            <article className="story-card">
              <div className="story-image">
                <Image
                  src="/images/유선화병.jpg"
                  alt="유선 화병"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="story-content">
                <span className="story-category">이야기</span>
                <h3 className="story-title">유선 화병</h3>
                <p className="story-excerpt">
                  흐르는 물결을 연상시키는 선의 움직임. 곡선의 리듬을 유선의 흐름으로 이어, 형태 전체에 고요한 긴장과 호흡을 담았습니다.
                </p>
              </div>
            </article>
            <article className="story-card">
              <div className="story-image">
                <Image
                  src="/images/바위 능선 화병.jpg"
                  alt="소경산수 화병"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="story-content">
                <span className="story-category">이야기</span>
                <h3 className="story-title">소경산수 화병</h3>
                <p className="story-excerpt">
                  문인화가 경물을 바라보는 시선과 구성 방식을 하나의 조형으로 엮어, 수묵의 선감을 입체로 번역합니다.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
