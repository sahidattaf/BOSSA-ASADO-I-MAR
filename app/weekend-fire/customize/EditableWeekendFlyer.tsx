'use client';

import { DragEvent, ChangeEvent, useRef, useState } from 'react';

type WeekendBox = {
  number: string;
  name: string;
  contents: string;
  price: string;
  tagline: string;
  image: string;
};

const initialBoxes: WeekendBox[] = [
  {
    number: '#1',
    name: 'BOSSA BOX MIX',
    contents: 'Fire-roasted chicken + ribs + chorizo + potato + salad',
    price: 'ANG 49.50',
    tagline: 'Featured sharing box',
    image: '/images/bossa/fire-ribs-box.png',
  },
  {
    number: '#2',
    name: 'SKEWER BOX',
    contents: 'Tenderloin skewer + chicken skewer + roasted potatoes',
    price: 'ANG 49.50',
    tagline: 'High-margin fire skewers',
    image: '/images/bossa/ribs-area.png',
  },
  {
    number: '#3',
    name: 'FIRE BREAD SANDWICH BOX',
    contents: 'Multiple rustic sandwiches cut open',
    price: 'ANG 49.50',
    tagline: 'Fire Bread variety',
    image: '/images/bossa/fire-breads.png',
  },
  {
    number: '#4',
    name: 'COMMUNITY FIRE BOX',
    contents: '4 chicken pieces + bread + potato',
    price: 'ANG 20.00',
    tagline: 'Built for speed & volume',
    image: '/images/bossa/hero-grill-area.png',
  },
  {
    number: '#5',
    name: 'CHICKEN CLASSIC',
    contents: 'Whole fire-roasted chicken + sides',
    price: 'ANG 49.50',
    tagline: 'Family-style fire meal',
    image: '/images/bossa/restaurant-design.jpg',
  },
  {
    number: '#6',
    name: 'RIBS CLASSIC',
    contents: 'Slow smoked ribs + glaze + potatoes',
    price: 'ANG 49.50',
    tagline: 'Slow smoke • fast handoff',
    image: '/images/bossa/ribs-bossa.png',
  },
  {
    number: '#7',
    name: 'BEACH BOX',
    contents: 'Mixed grill platter with chicken, ribs, skewers',
    price: 'ANG 99.50',
    tagline: 'Heavy appetite special',
    image: '/images/bossa/bbq-party-del-rey.jpg',
  },
  {
    number: '#8',
    name: 'LOCAL FIRE BOX',
    contents: 'Pork chop + chicken leg + chorizo + potatoes',
    price: 'ANG 39.50',
    tagline: 'Local pickup favorite',
    image: '/images/bossa/sandwich-stack.png',
  },
];

function EditableText({ children, label, className }: { children: string; label: string; className?: string }) {
  return (
    <span
      className={className}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={label}
      spellCheck={false}
    >
      {children}
    </span>
  );
}

function FlyerImage({ box, index, image, onImageChange }: {
  box: WeekendBox;
  index: number;
  image: string;
  onImageChange: (index: number, src: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const loadImage = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') onImageChange(index, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    loadImage(event.dataTransfer.files[0]);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    loadImage(event.target.files?.[0]);
  };

  return (
    <button
      type="button"
      className={`custom-food-img ${isDragging ? 'drag-active' : ''}`}
      aria-label={`Upload or drag image for ${box.name}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <img src={image} alt={`${box.name} preview`} />
      <span className="upload-overlay">📸 Click or drag image</span>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} hidden />
    </button>
  );
}

export default function EditableWeekendFlyer() {
  const [images, setImages] = useState(initialBoxes.map((box) => box.image));

  const updateImage = (index: number, src: string) => {
    setImages((current) => current.map((item, itemIndex) => (itemIndex === index ? src : item)));
  };

  return (
    <div className="custom-flyer-shell">
      <a href="#main-content" className="skip-link">Skip to menu</a>

      <div className="toolbar no-print">
        <a className="btn-back" href="/weekend-fire">← Back to Weekend Fire</a>
        <button className="btn-pdf" type="button" onClick={() => window.print()} aria-label="Save menu as PDF">
          ⬇ Download / Print PDF
        </button>
      </div>

      <section className="flyer" aria-label="Editable BOSSA Weekend Fire flyer">
        <div className="flyer-inner" id="main-content">
          <header className="custom-header">
            <div className="logo-area">
              <EditableText className="logo-placeholder" label="Edit logo text">BOSSA🔥</EditableText>
              <span className="fire-icon" aria-hidden="true">🔥</span>
            </div>
            <div className="title-group">
              <h1 className="main-title">
                <EditableText label="Edit main title">BOSSA WEEKEND BOX</EditableText>
              </h1>
              <div className="subheader">
                <EditableText label="Edit subheader">Thursday – Sunday • 12:00 PM – 10:00 PM • TAKE-OUT ONLY</EditableText>
              </div>
            </div>
            <div className="ocean-wave" aria-hidden="true">🌊</div>
          </header>

          <div className="menu-layout">
            <div className="cards-grid">
              {initialBoxes.map((box, index) => (
                <article className="editable-box-card" key={box.number} tabIndex={0}>
                  <EditableText className="box-number" label={`Edit box number for ${box.name}`}>{box.number}</EditableText>
                  <FlyerImage box={box} index={index} image={images[index]} onImageChange={updateImage} />
                  <EditableText className="box-name" label={`Edit box name for ${box.name}`}>{box.name}</EditableText>
                  <EditableText className="contents" label={`Edit contents for ${box.name}`}>{box.contents}</EditableText>
                  <EditableText className="price-badge" label={`Edit price for ${box.name}`}>{box.price}</EditableText>
                  <EditableText className="tagline" label={`Edit tagline for ${box.name}`}>{box.tagline}</EditableText>
                </article>
              ))}
            </div>

            <aside className="custom-sidebar" aria-label="Weekend Fire rules">
              <h2><EditableText label="Edit rules title">🔥 WEEKEND FIRE RULES</EditableText></h2>
              {['Take-Out Only', 'No Modifications', 'Order by Number', 'Limited Batches', 'Signature BOSSA JUS', 'Fire Bread Included'].map((rule) => (
                <div className="rule-item" key={rule}>
                  <span aria-hidden="true">•</span>
                  <EditableText label={`Edit rule ${rule}`}>{rule}</EditableText>
                </div>
              ))}
            </aside>
          </div>

          <div className="workflow" aria-label="Weekend Fire workflow">
            {['PREPARE', 'ORDER', 'CONFIRM', 'PACK', 'PICKUP'].map((step) => (
              <div className="step" key={step}>
                <span aria-hidden="true">🔥</span>
                <EditableText label={`Edit workflow step ${step}`}>{step}</EditableText>
              </div>
            ))}
          </div>

          <footer className="custom-footer">
            <div className="slogan">
              <EditableText label="Edit slogan">“NO NOISE. JUST HEAT.”</EditableText>
            </div>
            <div className="contact">
              <a href="https://wa.me/59995230683" target="_blank" rel="noopener noreferrer">💬 +5999 523 0683</a>
              <span>📍 <EditableText label="Edit address">Pietermaai • Curaçao</EditableText></span>
            </div>
          </footer>
        </div>

        <div className="batch-warning" role="status" aria-live="polite">
          🔥 Limited batches – when the fire rests, we close.
        </div>
        <div className="spark spark-one" aria-hidden="true" />
        <div className="spark spark-two" aria-hidden="true" />
        <div className="spark spark-three" aria-hidden="true" />
      </section>
    </div>
  );
}
