export const Arrow = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export const Check = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);

export const Close = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
);

export const Chevron = ({ dir = 'right' }) => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true" style={dir === 'left' ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const Phone = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const WhatsApp = () => (
  <svg viewBox="0 0 32 32" className="ico ico--fill" aria-hidden="true">
    <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.1c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.2 1.2-4-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.4 9.8 10.1 5.2 16 5.2s10.6 4.7 10.6 10.5S21.8 26.2 16 26.2zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
  </svg>
);
