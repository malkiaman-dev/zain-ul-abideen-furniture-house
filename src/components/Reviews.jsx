import { REVIEWS } from '../data.js';

/* Renders only once real reviews are added in data.js */
export default function Reviews() {
  if (!REVIEWS.length) return null;
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section className="reviews section">
      <header className="section__head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot" />Client Reviews</p>
          <h2 className="h2" data-reveal="1">Trust, <em className="gold">built</em> one home at a time.</h2>
        </div>
      </header>
      <div className="reviews__track">
        <div className="reviews__row">
          {row.map((r, i) => (
            <figure className="review" key={i} aria-hidden={i >= REVIEWS.length}>
              <div className="review__stars" aria-label="5 stars">★★★★★</div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption><span className="review__av">{r.name[0]}</span><span><b>{r.name}</b>{r.work}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
