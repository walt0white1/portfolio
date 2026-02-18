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
  'Tailwind CSS': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><circle cx="12" cy="12" r="10" fill="#06B6D4"/></svg>,
  'HTML5': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="3,2 21,2 18,22 12,24 6,22" fill="#E34C26"/></svg>,
  'CSS / SCSS': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="3,2 21,2 18,22 12,24 6,22" fill="#1572B6"/></svg>,
  'Git': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><circle cx="12" cy="12" r="10" fill="#F1502F"/></svg>,
  'Docker': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" fill="#2496ED"/></svg>,
  'Vercel': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><polygon points="12,2 22,20 2,20" fill="#000"/></svg>,
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
  'Responsive Design': <svg viewBox="0 0 24 24" className={styles.techLogoSvg}><rect width="24" height="24" fill="#10B981"/></svg>,
};

export default function TechLogo({ tech }) {
  return (
    <span className={styles.techLogoContainer}>
      {coloredLogos[tech]}
    </span>
  );
}
