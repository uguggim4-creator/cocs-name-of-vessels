import Image from 'next/image';

export default function Home() {
  return (
    <div className="main-grid">
      {/* 3x3 Grid Items */}
      <div className="grid-item">
        <Image src="/images/1.jpg" alt="Vessel 1" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Moon Jar</div>
      </div>
      <div className="grid-item">
        <Image src="/images/2.jpg" alt="Vessel 2" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">White Porcelain</div>
      </div>
      <div className="grid-item">
        <Image src="/images/3.jpg" alt="Vessel 3" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Celadon</div>
      </div>
      <div className="grid-item">
        <Image src="/images/4.jpg" alt="Vessel 4" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Tea Bowl</div>
      </div>
      <div className="grid-item">
        <Image src="/images/5.jpg" alt="Vessel 5" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Vase</div>
      </div>
      <div className="grid-item">
        <Image src="/images/6.jpg" alt="Vessel 6" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Plate</div>
      </div>
      <div className="grid-item">
        <Image src="/images/7.jpg" alt="Vessel 7" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Cup</div>
      </div>
      <div className="grid-item">
        <Image src="/images/8.jpg" alt="Vessel 8" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Pot</div>
      </div>
      <div className="grid-item">
        <Image src="/images/9.jpg" alt="Vessel 9" fill style={{ objectFit: 'cover' }} />
        <div className="grid-overlay">Bowl</div>
      </div>
    </div>
  );
}
