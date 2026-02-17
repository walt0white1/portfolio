import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
          let delay = 0;

          if (siblings) {
            siblings.forEach((sib, i) => {
              if (sib === entry.target) {
                delay = i * 100;
              }
            });
          }

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 400));

          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);
}
