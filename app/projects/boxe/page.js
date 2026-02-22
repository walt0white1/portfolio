'use client';

import Link from 'next/link';

export default function BoxingProject() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation - Retour au portfolio */}
      <nav style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(226, 27, 27, 0.2)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          color: '#fff',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          opacity: 0.8,
          transition: 'opacity 0.3s'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Retour au portfolio
        </Link>
        <a
          href="https://ironforge-boxing.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#a3a3a3',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            opacity: 0.7,
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          Ouvrir dans un nouvel onglet
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </nav>

      {/* Iframe - Site de boxe */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <iframe
          src="https://ironforge-boxing.vercel.app/"
          style={{
            width: '100%',
            height: 'calc(100vh - 56px)',
            border: 'none',
            backgroundColor: '#0a0a0a'
          }}
          title="Iron Forge Boxing Club"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
