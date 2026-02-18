'use client';

import Image from 'next/image';
import styles from '../page.module.css';

const logoUrls = {
  'React': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/nextjs/nextjs-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/typescript/typescript-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/javascript/javascript-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/nodejs/nodejs-original.svg',
  'Express': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/express/express-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/mongodb/mongodb-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/postgresql/postgresql-original.svg',
  'Prisma': 'https://www.prisma.io/images/favicon.png',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/tailwindcss/tailwindcss-plain.svg',
  'HTML5': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/html5/html5-original.svg',
  'CSS / SCSS': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/sass/sass-original.svg',
  'Git': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/git/git-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/docker/docker-original.svg',
  'Vercel': 'https://www.svgrepo.com/show/341522/vercel.svg',
  'API REST': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/swagger/swagger-original.svg',
  'Figma': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/figma/figma-original.svg',
  'Photoshop': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/photoshop/photoshop-original.svg',
  'Illustrator': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/illustrator/illustrator-original.svg',
  'After Effects': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/aftereffects/aftereffects-original.svg',
  'Premiere Pro': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/premierepro/premierepro-original.svg',
  'Blender': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/blender/blender-original.svg',
  'UI Design': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/figma/figma-original.svg',
  'Prototypage': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/figma/figma-original.svg',
  'Motion Design': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/aftereffects/aftereffects-original.svg',
  'Responsive Design': 'https://cdn.jsdelivr.net/npm/devicons@1.8.0/devicons/chrome/chrome-original.svg',
};

export default function TechLogo({ tech }) {
  const url = logoUrls[tech];

  if (!url) return null;

  return (
    <img
      src={url}
      alt={tech}
      className={styles.techLogo}
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
}
