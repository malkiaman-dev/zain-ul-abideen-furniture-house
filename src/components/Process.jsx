import { useEffect, useRef } from 'react';
import { PROCESS } from '../data.js';
import { gsap, reducedMotion } from '../lib/motion.js';

export default function Process() {
  const root = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.steps__line i', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: true }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process section" id="process" ref={root}>
      <header className="section__head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot" />How It Works</p>
          <h2 className="h2" data-reveal="1">From your idea to<br /><em className="gold">your home.</em></h2>
        </div>
      </header>
      <div className="steps">
        <div className="steps__line" aria-hidden="true"><i /></div>
        <ol>
          {PROCESS.map((s, i) => (
            <li key={s.n} className="step" data-reveal={i}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
