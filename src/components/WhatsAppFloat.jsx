import { waLink } from '../data.js';
import { WhatsApp } from './Icons.jsx';

export default function WhatsAppFloat() {
  return (
    <a className="wa-float magnetic" data-strength="0.4" href={waLink()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <WhatsApp />
      <span className="wa-float__tip">Chat with us</span>
    </a>
  );
}
