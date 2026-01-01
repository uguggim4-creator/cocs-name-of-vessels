import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="page-content">
      {/* Page Hero */}
      <section className="page-hero">
        <h1 className="page-title">About</h1>
      </section>

      {/* About Content */}
      <section className="section">
        <div className="container">
          <div className="about-section">
            <div className="about-image">
              <Image
                src="/images/1.jpg"
                alt="기물의 이름"
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
              <p>
                각각의 기물에는 고유한 이름이 있으며, 그 이름에는
                작가의 철학과 이야기가 담겨 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <h2 className="section-title">
            <span>Philosophy</span>
            철학
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '2', color: 'var(--color-text)' }}>
              우리는 단순히 그릇을 만드는 것이 아니라,
              일상 속에서 아름다움을 발견하는 경험을 만듭니다.
              <br /><br />
              한국 전통 도자기의 아름다움을 현대적으로 재해석하여,
              오늘날의 생활 공간에 자연스럽게 어우러지는 작품을 선보입니다.
              <br /><br />
              손으로 빚은 기물 하나하나에 정성을 담아,
              오래도록 함께할 수 있는 가치를 전합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            <span>Contact</span>
            연락처
          </h2>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ marginBottom: '16px' }}>
              <strong>기물의 이름 (Name of Vessel)</strong>
            </p>
            <p style={{ marginBottom: '8px', color: 'var(--color-muted)' }}>
              대표: 박채원
            </p>
            <p style={{ marginBottom: '8px', color: 'var(--color-muted)' }}>
              서울특별시 성북구 동소문로11길 44 1층
            </p>
            <p style={{ marginBottom: '40px' }}>
              <a href="mailto:chaewon@nameofvessel.com" style={{ color: 'var(--color-secondary)' }}>
                chaewon@nameofvessel.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
