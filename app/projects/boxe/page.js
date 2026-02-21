'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BoxeProject() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Vérifier si le serveur du projet boxe est accessible
    fetch('http://localhost:3001', { mode: 'no-cors' })
      .then(() => setIsOnline(true))
      .catch(() => setIsOnline(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div style={{ padding: '2rem', borderBottom: '1px solid #222' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Retour au portfolio
        </Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {!isOnline ? (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem' }}>⚠️ Serveur non disponible</h2>
            <p style={{ color: '#ccc', marginBottom: '2rem' }}>
              Le projet "Boxing Club Premium" doit être lancé localement pour être visible.
            </p>
            <div style={{ backgroundColor: '#0a0a0a', padding: '1rem', borderRadius: '4px', textAlign: 'left', marginBottom: '2rem' }}>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0, fontFamily: 'monospace' }}>
                $ cd /chemin/vers/boxe<br/>
                $ npm install<br/>
                $ npm run dev
              </p>
            </div>
            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
              Le projet sera accessible sur <code style={{ backgroundColor: '#1a1a1a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>http://localhost:3001</code>
            </p>
          </div>
        ) : (
          <iframe
            src="http://localhost:3001"
            style={{
              flex: 1,
              border: 'none',
              borderRadius: '8px',
              width: '100%',
              minHeight: '600px'
            }}
            title="Boxing Club Premium Project"
          />
        )}

        {/* Project Info */}
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #222',
          borderRadius: '8px',
          padding: '2rem'
        }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>À propos du projet</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Boxing Club Premium est un site web premium pour un club de boxe, conçu pour offrir une expérience immersive et moderne. Le site met en avant l'élégance du design avec des animations fluides et une présentation professionnelle des services.
          </p>

          <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Technologies utilisées</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {['Next.js 15', 'React 19', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Lucide Icons'].map((tech) => (
              <span
                key={tech}
                style={{
                  backgroundColor: '#222',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Caractéristiques</h4>
          <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
            <li>Design premium avec animations sophistiquées</li>
            <li>Navigation fluide et responsiva</li>
            <li>Section Hero immersive</li>
            <li>Présentation des services et tarifs</li>
            <li>Design moderne et élégant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
