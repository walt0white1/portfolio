'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          MT<span>.</span>
        </Link>
        <ul className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
          <li><a href="#about" onClick={closeMenu}>À propos</a></li>
          <li><a href="#skills" onClick={closeMenu}>Compétences</a></li>
          <li><a href="#expertise" onClick={closeMenu}>Expertise</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projets</a></li>
          <li><a href="#method" onClick={closeMenu}>Méthode</a></li>
          <li><a href="#contact" className="btn btn-primary" style={{padding: '10px 24px', fontSize: '13px'}} onClick={closeMenu}>Parlons-en</a></li>
        </ul>
        <button
          className={`${styles.toggle} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Ouvrir le menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
