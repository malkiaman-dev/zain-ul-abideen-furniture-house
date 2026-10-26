import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, startSmoothScroll, scrollToHash, getLenis, reducedMotion, finePointer } from './lib/motion.js';
import SheetsPage from './components/SheetsPage.jsx';
import Studio from './components/Studio.jsx';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Showcase from './components/Showcase.jsx';
import { SCHOOLS, OFFICES } from './data.js';
import Craft from './components/Craft.jsx';
import VideoCarousel from './components/VideoCarousel.jsx';
import Gallery from './components/Gallery.jsx';
import Materials from './components/Materials.jsx';
import Process from './components/Process.jsx';
import Reviews from './components/Reviews.jsx';
import CtaBand from './components/CtaBand.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

const routeFromHash = () => {
  const m = window.location.hash.match(/^#\/(sheets|studio)/);
  return m ? m[1] : 'home';
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(routeFromHash);
  const pageRef = useRef(page);
  const pendingHash = useRef(null);
  pageRef.current = page;

  // smooth scrolling, "#/page" routes and "#section" anchors
  useEffect(() => {
    startSmoothScroll();
    const onRoute = () => setPage(routeFromHash());
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const href = a.getAttribute('href');
      if (href.startsWith('#/')) return; // let the hash change drive the route
      e.preventDefault();
      if (pageRef.current !== 'home') {
        pendingHash.current = href;
        history.pushState(null, '', window.location.pathname);
        setPage('home');
      } else scrollToHash(href);
    };
    window.addEventListener('hashchange', onRoute);
    window.addEventListener('popstate', onRoute);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onRoute);
      window.removeEventListener('popstate', onRoute);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // on page switch: jump to top (or to the section that was clicked)
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      if (pendingHash.current) { scrollToHash(pendingHash.current); pendingHash.current = null; }
    }, 80);
    return () => clearTimeout(t);
  }, [page]);

  // site-wide scroll reveals, image parallax and magnetic buttons
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      if (!reducedMotion()) {
        gsap.utils.toArray('[data-reveal]').forEach(el => {
          gsap.from(el, {
            y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out',
            delay: (+el.dataset.reveal || 0) * 0.08,
            clearProps: 'transform',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
          });
        });
        gsap.utils.toArray('[data-parallax]').forEach(el => {
          const amt = +el.dataset.parallax || 12;
          gsap.fromTo(el, { yPercent: -amt }, {
            yPercent: amt, ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
          });
        });
      }
    });

    const cleanups = [];
    if (finePointer()) {
      document.querySelectorAll('.magnetic').forEach(el => {
        const k = el.dataset.strength ? +el.dataset.strength : 0.3;
        const move = e => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left, y = e.clientY - r.top;
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y}px`);
          el.style.transform = `translate(${(x - r.width / 2) * k}px, ${(y - r.height / 2) * k}px)`;
        };
        const leave = () => { el.style.transform = ''; };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    setTimeout(refresh, 400);
    return () => { ctx.revert(); cleanups.forEach(f => f()); window.removeEventListener('load', refresh); };
  }, [ready, page]);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Nav ready={ready} page={page} />
      <main id="top">
        {page === 'sheets' ? (
          <SheetsPage />
        ) : page === 'studio' ? (
          <Studio />
        ) : (
          <>
            <Hero ready={ready} />
            <Services />
            <Showcase data={OFFICES} />
            <Showcase data={SCHOOLS} />
            <Craft />
            <VideoCarousel />
            <Gallery />
            <Materials />
            <Process />
            <Reviews />
            <CtaBand />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
