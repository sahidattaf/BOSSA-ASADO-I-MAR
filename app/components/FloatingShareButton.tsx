'use client';

import { useState } from 'react';

function getShareData() {
  const url = window.location.href;
  const title = document.title || 'BOSSA Asado i Mar';
  const text = `${title} ${url}`;

  return { title, text, url };
}

export default function FloatingShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleNativeShare() {
    const shareData = getShareData();

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
      setIsOpen(false);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setIsOpen(false);
      }
    }
  }

  function handleWhatsAppShare() {
    const { text } = getShareData();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  }

  async function handleCopyLink() {
    const { url } = getShareData();

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setIsOpen(false);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="floating-share">
      {isOpen ? (
        <div className="floating-share-menu" aria-label="Share this BOSSA page">
          <button
            className="floating-share-action"
            type="button"
            aria-label="Share this page"
            data-track="share-click"
            data-share-action="native"
            onClick={handleNativeShare}
          >
            Share
          </button>
          <button
            className="floating-share-action"
            type="button"
            aria-label="Share this page on WhatsApp"
            data-track="share-click"
            data-share-action="whatsapp"
            onClick={handleWhatsAppShare}
          >
            WhatsApp
          </button>
          <button
            className="floating-share-action"
            type="button"
            aria-label="Copy this page link"
            data-track="share-click"
            data-share-action="copy-link"
            onClick={handleCopyLink}
          >
            Copy Link
          </button>
        </div>
      ) : null}
      {copied ? <span className="floating-share-copied">Copied</span> : null}
      <button
        className="floating-share-main"
        type="button"
        aria-label={isOpen ? 'Close share menu' : 'Open share menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <svg
          className="share-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .28 1.26L8.91 8.44A3 3 0 0 0 4 11a3 3 0 0 0 4.91 2.56l6.37 3.18A3 3 0 0 0 15 18a3 3 0 1 0 .83-2.07l-6.37-3.18a3 3 0 0 0 0-1.5l6.37-3.18A3 3 0 0 0 18 8Z" fill="currentColor" />
        </svg>
        <span className="share-label">Share</span>
      </button>
    </div>
  );
}
