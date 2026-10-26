import { WHY, photo } from '../data.js';

export default function Craft() {
  const big = photo('work-craftsman', 1356);
  const small = photo('craft-mark');
  return (
    <section className="craft section" id="why">
      <div className="craft__media">
        <figure className="craft__big" data-reveal>
          <img src={big.src} srcSet={big.srcSet} sizes="(max-width: 900px) 100vw, 55vw" alt="Karigar planing wood by hand in the workshop" loading="lazy" data-parallax="8" />
        </figure>
        <figure className="craft__small" data-reveal="2">
          <img src={small.src} srcSet={small.srcSet} sizes="(max-width: 900px) 50vw, 22vw" alt="Marking exact measurements on wood" loading="lazy" />
        </figure>
        <div className="craft__badge" data-reveal="3">
          <img src="/brand/logo-mark.webp" alt="" />
          <span>Handcrafted<br />in our workshop</span>
        </div>
      </div>

      <div className="craft__text">
        <p className="eyebrow" data-reveal><span className="dot" />Why Families Choose Us</p>
        <h2 className="h2" data-reveal="1">Real wood.<br />Real karigars.<br /><em className="gold">Real finishing.</em></h2>
        <ul className="why">
          {WHY.map((w, i) => (
            <li key={w.title} data-reveal={i}>
              <span className="why__n">0{i + 1}</span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
