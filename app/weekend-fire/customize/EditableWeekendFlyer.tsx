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

type Html2Canvas = (element: HTMLElement, options?: Record<string, unknown>) => Promise<HTMLCanvasElement>;

const initialBoxes: WeekendBox[] = [
  {
    number: '#1',
    name: 'BOSSA BOX MIX',
    contents: 'Fire-roasted 1 pc chicken whole legs + 1/2 ribs + 1 chorizo + 1 porkchop + garlic bread + garlic sauce',
    price: 'XCG 49.50',
    tagline: 'Featured sharing box',
    image: '/images/bossa/weekend-fire/box-1-bossa-box-mix.png',
  },
  {
    number: '#2',
    name: 'SKEWER BOX',
    contents: 'Tenderloin skewer + chicken skewer + garlic sauce + garlic bread',
    price: 'XCG 49.50',
    tagline: 'Tenderloin skewer 35 · Chicken skewer 25 · High-margin fire skewers',
    image: '/images/bossa/weekend-fire/box-2-skewer-box.png',
  },
  {
    number: '#3',
    name: 'FIRE BREAD SANDWICH BOX',
    contents:
      '#9 Chicken salad 12 · #10 whole legs 12 · #11 chicken boneless 12 · #12 porkchop 12 · #13 chorizo 12 · #14 grilled steak / stew 15 · #15 tenderloin 20',
    price: 'XCG 49.50',
    tagline: 'Fire Bread variety',
    image: '/images/bossa/weekend-fire/box-3-fire-bread-sandwich-box.png',
  },
  {
    number: '#4',
    name: 'COMMUNITY FIRE BOX',
    contents: '4 chicken pieces + bread + garlic sauce + baked potato',
    price: 'XCG 19.50',
    tagline: 'Built for speed & volume',
    image: '/images/bossa/weekend-fire/box-4-community-fire-box.png',
  },
  {
    number: '#5',
    name: 'CHICKEN CLASSIC',
    contents: 'Whole fire-roasted chicken or 8 pc roast/grill chicken with 2 sides',
    price: 'XCG 49.50',
    tagline: 'Family-style fire meal',
    image: '/images/bossa/weekend-fire/box-5-chicken-classic.png',
  },
  {
    number: '#6',
    name: 'RIBS CLASSIC',
    contents: 'Slow-smoked ribs: 2 full ribs + garlic sauce + bread',
    price: 'XCG 49.50',
    tagline: 'Slow smoke · fast handoff',
    image: '/images/bossa/weekend-fire/box-6-ribs-classic.png',
  },
  {
    number: '#7',
    name: 'SEA BOX Coming Soon',
    contents: 'Mixed grill & seafood platter with 1 catch-of-the-day skewer, 1 tenderloin skewer, and 2 sides',
    price: 'XCG 99.50',
    tagline: 'Heavy appetite special',
    image: '/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png',
  },
  {
    number: '#8',
    name: 'LOCAL FIRE BOX',
    contents:
      'Fresh salad 10 · seaweeds 10 · hummus 10 · homemade garlic bread / pita 4 · baked potato 7 · boiled cassava 10 · boiled potato · 1 pc chorizo 6 · boiled peanuts 6 · beer 6',
    price: 'XCG 6',
    tagline: 'Local pickup favorite',
    image: '/images/bossa/weekend-fire/box-8-local-fire-box.png',
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
  const flyerRef = useRef<HTMLElement | null>(null);
  const [images, setImages] = useState(initialBoxes.map((box) => box.image));
  const [exportStatus, setExportStatus] = useState('Ready to customize.');

  const updateImage = (index: number, src: string) => {
    setImages((current) => current.map((item, itemIndex) => (itemIndex === index ? src : item)));
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const loadHtml2Canvas = async (): Promise<Html2Canvas> => {
    const windowWithLibrary = window as unknown as { html2canvas?: Html2Canvas };
    if (windowWithLibrary.html2canvas) return windowWithLibrary.html2canvas;

    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector('script[data-bossa-html2canvas="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('html2canvas failed to load')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.async = true;
      script.dataset.bossaHtml2canvas = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('html2canvas failed to load'));
      document.body.appendChild(script);
    });

    if (!windowWithLibrary.html2canvas) throw new Error('html2canvas unavailable after loading');
    return windowWithLibrary.html2canvas;
  };

  const saveAsPng = async () => {
    if (!flyerRef.current) return;
    try {
      setExportStatus('Preparing PNG...');
      const html2canvas = await loadHtml2Canvas();
      const canvas = await html2canvas(flyerRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0a0a0c',
      });
      const anchor = document.createElement('a');
      anchor.download = 'bossa-weekend-box.png';
      anchor.href = canvas.toDataURL('image/png');
      anchor.click();
      setExportStatus('PNG downloaded.');
    } catch (error) {
      console.error(error);
      setExportStatus('PNG export failed. Use Download / Print PDF as backup.');
    }
  };

  const saveAsHtml = () => {
    if (!flyerRef.current) return;
    const flyerHtml = flyerRef.current.outerHTML;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BOSSA Weekend Box</title>
  <style>
    body { margin: 0; padding: 20px; background: #0a0a0c; color: #f5f0e8; font-family: Arial, Helvetica, sans-serif; }
    * { box-sizing: border-box; }
    img { max-width: 100%; display: block; }
    [contenteditable='true']:focus { outline: 2px solid #f5bd7a; outline-offset: 2px; }
    .flyer { max-width: 1920px; width: 100%; background: #0a0a0c; border-radius: 24px; margin: 0 auto; overflow: hidden; }
    .flyer-inner { padding: 2rem 2.5rem; }
    .custom-header, .menu-layout, .contact, .toolbar { display: flex; }
    .custom-header { justify-content: space-between; align-items: flex-start; gap: 18px; margin-bottom: 2rem; flex-wrap: wrap; }
    .logo-area { display: flex; align-items: center; gap: 12px; }
    .logo-placeholder { font-size: 2.2rem; font-weight: 900; background: #12141a; padding: 0.3rem 0.8rem; border-radius: 12px; border-left: 4px solid #e67e22; font-family: Impact, Arial Black, sans-serif; }
    .title-group { text-align: center; flex: 1; min-width: 280px; }
    .main-title { margin: 0; font-size: clamp(42px, 5.5vw, 76px); letter-spacing: 4px; line-height: 1; color: #f5dfa0; font-family: Impact, Arial Black, sans-serif; }
    .subheader { font-weight: 800; color: #e67e22; letter-spacing: 1px; display: inline-block; padding: 0.45rem 1rem; border-radius: 40px; margin-top: 0.8rem; }
    .menu-layout { gap: 2rem; margin: 2rem 0; }
    .cards-grid { flex: 3; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
    .editable-box-card { background: #12141a; border: 1.5px solid #e67e22; border-radius: 20px; padding: 0.9rem; display: flex; flex-direction: column; }
    .box-number { display: inline-flex; width: fit-content; background: #e67e22; color: #0a0a0c; font-weight: 900; padding: 0.3rem 0.65rem; border-radius: 999px; }
    .custom-food-img { height: 120px; background: #1e1c16; border-radius: 12px; margin: 0.5rem 0; overflow: hidden; border: 1px solid #2a2418; }
    .custom-food-img img { width: 100%; height: 100%; object-fit: cover; }
    .upload-overlay { display: none; }
    .box-name { font-weight: 900; font-size: 1rem; display: block; }
    .contents { font-size: 0.78rem; color: #d0d0d0; line-height: 1.35; display: block; }
    .price-badge { background: #e67e22; color: #0a0a0c; font-weight: 900; font-size: 0.9rem; padding: 0.26rem 0.65rem; border-radius: 40px; display: inline-block; margin: 0.5rem 0 0.2rem; width: fit-content; }
    .tagline { font-size: 0.72rem; color: #f5bd7a; font-style: italic; margin-top: auto; display: block; }
    .custom-sidebar { flex: 1; background: #12141a; border-radius: 24px; padding: 1.2rem; border: 1px solid #e67e22; height: fit-content; }
    .rule-item { display: flex; align-items: center; gap: 12px; margin: 1rem 0; }
    .workflow { background: rgba(0,0,0,0.7); border-radius: 60px; padding: 0.8rem 1rem; display: flex; justify-content: space-around; margin: 1.8rem 0; border-top: 1px solid #e67e22; border-bottom: 1px solid #e67e22; flex-wrap: wrap; gap: 12px; }
    .step { text-align: center; font-weight: 800; font-size: 0.9rem; color: #e67e22; display: grid; gap: 5px; }
    .slogan { font-family: Impact, Arial Black, sans-serif; font-size: clamp(34px, 4vw, 56px); letter-spacing: 6px; color: #f5dfa0; text-align: center; }
    .contact { justify-content: center; gap: 2rem; margin: 0.8rem 0; flex-wrap: wrap; }
    .batch-warning { background: #e67e22; color: #0a0a0c; padding: 10px; text-align: center; border-radius: 40px; margin: 20px auto; max-width: 600px; font-weight: 900; }
    @media (max-width: 1100px) { .menu-layout { flex-direction: column; } .cards-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 760px) { .flyer-inner { padding: 1rem; } .cards-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <p style="text-align:center;color:#f5bd7a;font-weight:700;">Click any text to edit. Print from your browser when ready.</p>
  ${flyerHtml}
</body>
</html>`;

    downloadBlob(new Blob([html], { type: 'text/html' }), 'bossa-weekend-box.html');
    setExportStatus('Editable HTML downloaded.');
  };

  return (
    <div className="custom-flyer-shell">
      <a href="#main-content" className="skip-link">Skip to menu</a>

      <div className="toolbar no-print">
        <div className="toolbar-hint">✏️ Click text to edit · 📸 Click or drag image slots to replace</div>
        <a className="btn-back" href="/weekend-fire">← Back to Weekend Fire</a>
        <button className="btn-back" type="button" onClick={saveAsHtml} aria-label="Save flyer as editable HTML">
          Save as HTML
        </button>
        <button className="btn-pdf" type="button" onClick={saveAsPng} aria-label="Download flyer as PNG">
          Download PNG
        </button>
        <button className="btn-pdf" type="button" onClick={() => window.print()} aria-label="Save menu as PDF">
          Print / PDF
        </button>
      </div>
      <p className="export-status no-print">{exportStatus}</p>

      <section className="flyer" aria-label="Editable BOSSA Weekend Fire flyer" ref={flyerRef}>
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
              <div className="qr-card">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https%3A%2F%2Fwww.bossaasado.com%2Fweekend-fire"
                  alt="QR code for BOSSA Weekend Fire website"
                />
                <EditableText label="Edit website text">www.bossaasado.com</EditableText>
              </div>
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
              <span>📍 <EditableText label="Edit address">Oranjestraat 116, Pietermaai, Willemstad, Curaçao</EditableText></span>
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

