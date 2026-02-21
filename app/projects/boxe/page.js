'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BoxeProject() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (e) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Animated gradient background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Navigation */}
        <nav style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <Link href="/" style={{
            color: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: 'fit-content',
            fontSize: '0.95rem',
            opacity: 0.8,
            transition: 'opacity 0.3s'
          }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Retour au portfolio
          </Link>
        </nav>

        {/* Hero Section */}
        <section style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                color: '#ff6b6b',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: '500',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                marginBottom: '1rem'
              }}>SITE PREMIUM</span>
            </div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              lineHeight: '1.2',
              backgroundImage: 'linear-gradient(135deg, #ffffff, #ff6b6b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Boxing Club<br/>Premium
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#aaa',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Un site web haute performance pour un club de boxe. Design premium, animations sophistiquées et expérience utilisateur immersive.
            </p>
            <img
              src="/images/projects/boxing-preview.png"
              alt="Boxing Club Premium Preview"
              style={{
                width: '100%',
                maxWidth: '900px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 107, 107, 0.2)',
                boxShadow: '0 20px 60px rgba(255, 107, 107, 0.1)',
                marginBottom: '2rem'
              }}
            />
          </div>
        </section>

        {/* Project Details */}
        <section style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Tech Stack */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <h3 style={{
                color: '#fff',
                marginBottom: '1.5rem',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>Stack Technologique</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {['Next.js 15', 'React 19', 'Tailwind CSS', 'Framer Motion', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      color: '#60a5fa',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <h3 style={{
                color: '#fff',
                marginBottom: '1.5rem',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>Caractéristiques</h3>
              <ul style={{
                color: '#ccc',
                lineHeight: '1.8',
                listStyle: 'none',
                padding: 0
              }}>
                {['Design premium élégant', 'Animations fluides', 'Performance optimale', 'Responsive design'].map((feature) => (
                  <li key={feature} style={{ marginBottom: '0.75rem' }}>
                    <span style={{ color: '#ff6b6b', marginRight: '0.75rem' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <h3 style={{
                color: '#fff',
                marginBottom: '1.5rem',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>Performance</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Lighthouse Score</div>
                  <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>98/100</div>
                </div>
                <div>
                  <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Page Speed</div>
                  <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>{'< 2s'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Project */}
        <section style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '3rem'
          }}>
            <h2 style={{
              color: '#fff',
              fontSize: '2rem',
              marginBottom: '1.5rem',
              fontWeight: '700'
            }}>À Propos du Projet</h2>
            <p style={{
              color: '#ccc',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '1.5rem'
            }}>
              Boxing Club Premium est un site web haute gamme conçu pour un club de boxe prestigieux. Le projet met l'accent sur l'élégance du design, la fluidité des animations et une présentation professionnelle des services offerts.
            </p>
            <p style={{
              color: '#ccc',
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}>
              Construit avec les technologies les plus modernes, le site offre une expérience utilisateur immersive et performante, adaptée à tous les appareils. Chaque élément a été soigneusement pensé pour refléter la qualité et le prestige de la marque.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '1.5rem',
            fontWeight: '700'
          }}>Intéressé par un projet similaire ?</h2>
          <Link href="/#contact" style={{
            display: 'inline-block',
            backgroundColor: '#ff6b6b',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'background-color 0.3s'
          }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff5252'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b6b'}>
            Discutons de votre projet
          </Link>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9rem',
          marginTop: '2rem'
        }}>
          <p>© 2025 Matteo Taubin. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
}
