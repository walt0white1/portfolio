'use client';

import Image from 'next/image';
import styles from '../page.module.css';

const logoUrls = {
  'React': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
  'Next.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
  'TypeScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
  'JavaScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
  'Node.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
  'Express': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
  'MongoDB': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
  'PostgreSQL': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
  'Prisma': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg',
  'Tailwind CSS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg',
  'HTML5': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
  'CSS / SCSS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',
  'Git': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
  'Docker': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
  'Vercel': 'https://www.svgrepo.com/show/341522/vercel.svg',
  'API REST': 'https://www.svgrepo.com/show/373595/rest.svg',
  'Figma': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
  'Photoshop': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-original.svg',
  'Illustrator': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/illustrator/illustrator-original.svg',
  'After Effects': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/aftereffects/aftereffects-original.svg',
  'Premiere Pro': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/premierepro/premierepro-original.svg',
  'Blender': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg',
  'UI Design': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
  'Prototypage': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
  'Motion Design': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/aftereffects/aftereffects-original.svg',
  'Responsive Design': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/chrome/chrome-original.svg',
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
