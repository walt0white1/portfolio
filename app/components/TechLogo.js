'use client';

import styles from '../page.module.css';

// SVG Logos colorés avec les vraies couleurs officielles
const coloredLogos = {
  'React': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0)"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60)"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120)"/></svg>,
  'Next.js': <svg viewBox="0 0 24 24" fill="#000" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#000"/><text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">NX</text></svg>,
  'TypeScript': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#3178C6"/><text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">TS</text></svg>,
  'JavaScript': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#F7DF1E"/><text x="12" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000">JS</text></svg>,
  'Node.js': <svg viewBox="0 0 24 24" fill="#68A063" className={styles.techLogoSvg}><circle cx="12" cy="12" r="10" fill="#68A063"/><circle cx="12" cy="12" r="7" fill="#fff" opacity="0.2"/></svg>,
  'Express': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#000"/><text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">EX</text></svg>,
  'MongoDB': <svg viewBox="0 0 24 24" fill="#13AA52" className={styles.techLogoSvg}><circle cx="12" cy="12" r="10" fill="#13AA52"/></svg>,
  'PostgreSQL': <svg viewBox="0 0 24 24" fill="#336791" className={styles.techLogoSvg}><circle cx="12" cy="12" r="10" fill="#336791"/></svg>,
  'Prisma': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="12,2 22,20 2,20" fill="#2D3748"/></svg>,
  'Tailwind CSS': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><path d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.5 22 22 17.5 22 12 C 22 6.5 17.5 2 12 2 Z" fill="#06B6D4"/><path d="M 8 10 C 8.5 8 10 7 12 7 C 14 7 15.5 8 16 10" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><path d="M 7 14 C 7.5 12 9 11 11 11 C 13 11 14.5 12 15 14" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><path d="M 9 18 C 9.5 16.5 10.7 15.5 12 15.5 C 13.3 15.5 14.5 16.5 15 18" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  'HTML5': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="3,2 21,2 18,22 12,24 6,22" fill="#E34C26"/></svg>,
  'CSS / SCSS': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="3,2 21,2 18,22 12,24 6,22" fill="#1572B6"/></svg>,
  'Git': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><circle cx="12" cy="12" r="10" fill="#F1502F"/></svg>,
  'Docker': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" fill="#2496ED"/></svg>,
  'Vercel': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="12,3 20,21 4,21" fill="#000"/><polygon points="12,3 20,21 12,21" fill="#fff"/></svg>,
  'API REST': <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className={styles.techLogoSvg}><circle cx="6" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="12" r="2"/></svg>,
  'Figma': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" fill="#A259FF"/></svg>,
  'Photoshop': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#31A8FF"/><text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">Ps</text></svg>,
  'Illustrator': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#FF9A00"/><text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">Ai</text></svg>,
  'After Effects': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#0066CC"/><text x="12" y="14" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">Ae</text></svg>,
  'Premiere Pro': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" rx="2" fill="#0066CC"/><text x="12" y="14" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">Pr</text></svg>,
  'Blender': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><circle cx="12" cy="12" r="10" fill="#FF7F00"/></svg>,
  'UI Design': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" fill="#A259FF"/></svg>,
  'Prototypage': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" fill="#8B5CF6"/></svg>,
  'Motion Design': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="12,2 20,10 12,18 4,10" fill="#EC4899"/></svg>,
  'Responsive Design': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect x="2" y="3" width="20" height="14" rx="1" fill="none" stroke="#10B981" strokeWidth="1.5"/><line x1="2" y1="8" x2="22" y2="8" stroke="#10B981" strokeWidth="1.5"/><circle cx="6" cy="20" r="1.5" fill="#10B981"/><circle cx="12" cy="20" r="1.5" fill="#10B981"/><circle cx="18" cy="20" r="1.5" fill="#10B981"/></svg>,
};

export default function TechLogo({ tech }) {
  return (
    <span className={styles.techLogoContainer}>
      {coloredLogos[tech]}
    </span>
  );
}
