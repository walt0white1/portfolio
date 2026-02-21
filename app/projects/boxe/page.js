'use client';

import Link from 'next/link';

export default function BoxingClubPremium() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <nav style={{
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(255, 107, 107, 0.2)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
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

      {/* IFrame Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden'
      }}>
        <iframe
          src={process.env.NEXT_PUBLIC_BOXE_URL || 'http://localhost:3001'}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: '#0a0a0a'
          }}
          title="Boxing Club Premium"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
