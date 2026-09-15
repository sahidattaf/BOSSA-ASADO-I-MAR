'use client';

import { FormEvent, useState } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type ConciergeResponse = { ok: boolean; reply?: string; conversation_id?: string; needs_handoff?: boolean; handoff_text?: string | null; error?: string };

const starters = ['Menu', 'Reservation', 'Catering', 'Private Event', 'Rooftop / Events', 'Location & Hours'];

export default function AiConciergeChat({ whatsappNumber }: { whatsappNumber: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: 'Bon dia! I’m BOSSA AI Concierge. Ask me about the menu, hours, location, reservations, catering or private events.' }]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string>();
  const [handoffText, setHandoffText] = useState('Bon dia BOSSA, I have a question for the concierge. Topic: ___ Message: ___');
  const [busy, setBusy] = useState(false);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(handoffText)}`;

  async function sendMessage(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    setMessages((current) => [...current, { role: 'user', content: message }]);
    setInput('');
    setBusy(true);
    try {
      const response = await fetch('/api/ai-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversation_id: conversationId }),
      });
      const data = (await response.json()) as ConciergeResponse;
      if (!response.ok || !data.ok || !data.reply) throw new Error(data.error || 'Concierge request failed.');
      setConversationId(data.conversation_id);
      if (data.needs_handoff && data.handoff_text) setHandoffText(data.handoff_text);
      setMessages((current) => [...current, { role: 'assistant', content: data.reply! }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'assistant', content: error instanceof Error ? error.message : 'The concierge is temporarily unavailable. Please use WhatsApp.' }]);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section className="section premium-section" aria-label="BOSSA AI Concierge chat">
      <div className="container">
        <div className="card" style={{ maxWidth: 820, margin: '0 auto' }}>
          <div className="cta-row" style={{ marginBottom: 16 }}>
            {starters.map((starter) => <button className="button" type="button" key={starter} onClick={() => void sendMessage(starter)} disabled={busy}>{starter}</button>)}
          </div>
          <div aria-live="polite" style={{ display: 'grid', gap: 12, minHeight: 240, maxHeight: 460, overflowY: 'auto', marginBottom: 16 }}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} style={{ padding: 12, border: '1px solid currentColor', borderRadius: 12, opacity: message.role === 'assistant' ? 1 : 0.85 }}>
                <strong>{message.role === 'assistant' ? 'BOSSA' : 'You'}</strong>
                <p style={{ marginBottom: 0 }}>{message.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
            <label htmlFor="concierge-message"><strong>Ask BOSSA</strong></label>
            <textarea id="concierge-message" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1200} rows={3} placeholder="Ask about the menu, a reservation, catering, location…" disabled={busy} />
            <div className="cta-row">
              <button className="button primary" type="submit" disabled={busy || !input.trim()}>{busy ? 'Asking…' : 'Send'}</button>
              <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer" data-track="whatsapp-click" data-cta-source="ai-concierge" data-cta-label="chat-handoff">Ask on WhatsApp</a>
            </div>
          </form>
          <p style={{ marginTop: 12, fontSize: 14 }}>Reservations and live availability are requests until BOSSA confirms them. Allergy questions require staff confirmation.</p>
        </div>
      </div>
    </section>
  );
}
