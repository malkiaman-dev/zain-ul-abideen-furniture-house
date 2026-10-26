import { useState } from 'react';
import { CONFIG, waLink } from '../data.js';
import { Arrow } from './Icons.jsx';

const NEEDS = ['Wardrobe / Almari', 'Kitchen', 'Doors', 'Windows', 'Office Furniture', 'Study Table', 'School Furniture', 'Dining / Tables', 'Complete Room', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', message: '' });
  const [needs, setNeeds] = useState([]);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState('We usually reply within a few hours.');

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const toggle = n => setNeeds(arr => (arr.includes(n) ? arr.filter(x => x !== n) : [...arr, n]));

  const submit = e => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = true;
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) err.phone = true;
    setErrors(err);
    if (Object.keys(err).length) { setNote('Please enter your name and a valid phone number.'); return; }
    const text = [
      `Assalam o Alaikum, ${CONFIG.name}!`,
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.city.trim() && `City / Area: ${form.city.trim()}`,
      needs.length && `Interested in: ${needs.join(', ')}`,
      form.message.trim() && `Details: ${form.message.trim()}`
    ].filter(Boolean).join('\n');
    window.open(waLink(text), '_blank', 'noopener');
    setNote('Opening WhatsApp… shukriya! We will get back to you soon.');
  };

  const glow = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact__left">
        <p className="eyebrow" data-reveal><span className="dot" />Free Quote</p>
        <h2 className="h2" data-reveal="1">Tell us what<br />you <em className="gold">need.</em></h2>
        <p className="lead" data-reveal="2">Fill this in and it opens WhatsApp with your details ready — or just call us. Home visits for measurement are free.</p>
        <ul className="contact__info">
          <li data-reveal="0"><span>Phone / WhatsApp</span><a href={`tel:${CONFIG.phoneTel}`}>{CONFIG.phoneDisplay}</a></li>
          <li data-reveal="1"><span>Email</span><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li>
          <li data-reveal="2"><span>Workshop</span><p>{CONFIG.address}</p></li>
          <li data-reveal="3"><span>Hours</span><p>{CONFIG.hours}</p></li>
        </ul>
      </div>

      <form className="quote" onSubmit={submit} onPointerMove={glow} noValidate data-reveal="1">
        <h3>Request a free quote</h3>
        <div className="quote__row">
          <div className={`field${errors.name ? ' is-error' : ''}`}>
            <input id="q-name" value={form.name} onChange={set('name')} placeholder=" " autoComplete="name" />
            <label htmlFor="q-name">Your name</label>
          </div>
          <div className={`field${errors.phone ? ' is-error' : ''}`}>
            <input id="q-phone" value={form.phone} onChange={set('phone')} placeholder=" " inputMode="tel" autoComplete="tel" />
            <label htmlFor="q-phone">Phone number</label>
          </div>
        </div>
        <div className="field">
          <input id="q-city" value={form.city} onChange={set('city')} placeholder=" " autoComplete="address-level2" />
          <label htmlFor="q-city">City / Area</label>
        </div>
        <fieldset className="chips">
          <legend>What do you need?</legend>
          {NEEDS.map(n => (
            <label key={n}>
              <input type="checkbox" checked={needs.includes(n)} onChange={() => toggle(n)} />
              <span>{n}</span>
            </label>
          ))}
        </fieldset>
        <div className="field">
          <textarea id="q-msg" rows="3" value={form.message} onChange={set('message')} placeholder=" " />
          <label htmlFor="q-msg">Size, design or anything else (optional)</label>
        </div>
        <button type="submit" className="btn btn--gold btn--block magnetic" data-strength="0.12">
          <span>Send on WhatsApp</span><Arrow />
        </button>
        <p className={`quote__note${Object.keys(errors).length ? ' is-error' : ''}`} role="status">{note}</p>
      </form>
    </section>
  );
}
