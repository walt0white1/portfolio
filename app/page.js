'use client';


import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import useScrollReveal from './hooks/useScrollReveal';
import TechLogo from './components/TechLogo';
import styles from './page.module.css';

const SectionLabel = ({ children }) => (
  <span className="section-label">{children}</span>
);

// Logos colorés avec les vraies identités visuelles
const skillIcons = {
  'React': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/></svg>,
  'Next.js': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.534-.051.469 0 .534.016.64.105.03.025 1.34 2.001 2.91 4.393l4.76 7.212 1.91 2.892.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.009-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>,
  'TypeScript': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.42.276.69.394.57.232.89.336a9.09 9.09 0 0 1 1.354.603c.39.218.72.465.988.744.27.279.47.59.604.936.135.347.203.733.203 1.16 0 .642-.145 1.18-.435 1.612-.29.432-.68.784-1.168 1.054-.487.27-1.05.466-1.69.588-.64.122-1.3.183-1.977.183-.55 0-1.1-.048-1.652-.144A7.3 7.3 0 0 1 13.1 19.3v-2.674c.58.39 1.198.681 1.85.873.655.192 1.267.288 1.838.288.244 0 .47-.024.681-.072a1.7 1.7 0 0 0 .552-.214.98.98 0 0 0 .369-.366.99.99 0 0 0 .134-.532.93.93 0 0 0-.184-.572 1.99 1.99 0 0 0-.522-.453 5.52 5.52 0 0 0-.813-.402 10.4 10.4 0 0 0-1.053-.392c-.476-.16-.91-.348-1.302-.566a4.1 4.1 0 0 1-1.006-.766 3.22 3.22 0 0 1-.648-.987c-.154-.373-.231-.798-.231-1.277 0-.612.14-1.14.422-1.583.282-.443.662-.8 1.14-1.073.478-.273 1.032-.471 1.665-.595a9.04 9.04 0 0 1 2.03-.185zm-9.975.525H14.4v1.922H11.76v7.553H9.213v-7.553H6.6V10.5h1.912z"/></svg>,
  'JavaScript': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>,
  'Node.js': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.09-.21-.21-.21H8.22c-.12 0-.21.09-.21.21v8.06c0 .66-.68 1.31-1.77.76L4.16 16c-.07-.04-.12-.12-.12-.2V7.71c0-.09.05-.17.12-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.12.12.12.21v8.58c0 .08-.05.16-.12.2l-7.44 4.29c-.06.04-.14.04-.21 0l-1.89-1.12c-.06-.03-.13-.04-.18-.01-.52.3-.62.33-1.11.5-.12.04-.31.11.07.32l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z"/></svg>,
  'Express': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.042-3.368-2.058-5.264-4.956-5.2a5.207 5.207 0 0 0-4.698 5.2z"/></svg>,
  'MongoDB': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z"/></svg>,
  'PostgreSQL': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5445-.0191 1.342-2.0482 2.445-4.522 3.0412-6.8967.2989-1.1908.4578-2.2705.4722-3.2088.0133-.865-.1258-1.5903-.4132-2.1567C21.6237.6498 19.937.125 17.8399.125c-1.3455 0-2.8848.3399-4.0882.6707a9.13 9.13 0 0 0-.5765-.0351c-1.4581-.0471-2.6793.4493-3.6458 1.4389a5.714 5.714 0 0 0-.5765-.0607c-1.1576-.0471-2.1795.2978-3.0319 1.0252C4.4686 4.4223 3.27 6.6637 2.4281 9.96c-.5765 2.267-.871 4.3543-.871 6.1962 0 1.3516.179 2.4312.5765 3.2636.6156 1.0761 1.7064 1.6456 3.1551 1.6456.8804 0 1.8671-.2321 2.1795-2.6072l.2989-1.8424c.0393-.2321.0845-.4829.1357-.7524.3272.7466.7984 1.4389 1.4093 2.0482.8893.8856 2.0059 1.4024 3.0637 1.4024.1669 0 .3379-.0157.5073-.0471 1.6569-.3054 2.7807-1.6456 3.3948-4.0413l.0845-.3229c.3506.5658.8372.9715 1.4735 1.1035.2518.0528.5283.0798.8259.0798 1.8671 0 4.1523-1.3459 4.5436-2.4312.1298-.3598.0643-.6594-.0643-.8556z"/></svg>,
  'Prisma': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7041-1.1286-.6945-.4895.0096-.9139.2888-1.1076.7297L.4052 18.2848c-.2115.4788-.105 1.0384.2715 1.4276l4.0532 4.1915c.2459.2543.5812.3947.9283.3947.0698 0 .1398-.006.2093-.018l14.4318-2.4564c.3787-.0644.7003-.3146.8563-.6661.1561-.3514.122-.7568-.0905-1.0792l-.261-.3939zM5.2447 21.7364l-2.9222-3.0213 9.4846-16.3694 5.2753 15.1685-11.8377 4.2222z"/></svg>,
  'Tailwind CSS': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>,
  'HTML5': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.071-.747.581-6.503.066-.75H3.664l.171 2.016.025.28h7.73l-.285 3.178H5.508l.171 2.016.025.28h6.556l-.311 3.513-.052.598-2.886.79-2.91-.797-.186-2.087H3.9l.37 4.127L11.977 21l7.635-2.077.055-.629 1.013-11.566.071-.791H8.531z"/></svg>,
  'CSS / SCSS': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716H6.19l.24 2.573h8.596l-.36 3.821-2.69.726-2.687-.727-.188-2.028H6.55l.333 3.97L12 19.351l5.21-1.399 1.38-13.54z"/></svg>,
  'Git': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.643-.22 1.386-.076 1.9.438.721.72.721 1.884 0 2.604-.719.719-1.882.719-2.604 0-.543-.544-.676-1.338-.396-2.012L12.67 8.73v6.705c.175.088.34.21.488.36.72.72.72 1.884 0 2.604-.72.719-1.884.719-2.604 0-.72-.72-.72-1.885 0-2.604.192-.192.412-.336.646-.432V8.49c-.234-.095-.454-.24-.646-.432-.556-.556-.683-1.36-.384-2.036L7.452 3.373.453 10.37c-.603.605-.603 1.584 0 2.19l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582-.003-2.187"/></svg>,
  'Docker': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.186.186 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.186.186 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.186.186 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>,
  'Vercel': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>,
  'API REST': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
  'Figma': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.015-4.49-4.491s2.014-4.49 4.49-4.49h4.588v8.981zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.02c0 1.689 1.38 3.068 3.043 3.068a3.07 3.07 0 0 0 3.068-3.068v-3.02H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h.098c1.665 0 3.019-1.355 3.019-3.02s-1.354-3.02-3.019-3.02h-.098z"/></svg>,
  'Photoshop': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01-.2-.01-.34 0-.41.01v3.36c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.6-.23-.85-.16-.25-.39-.44-.66-.56l-.04-.05zM0 0v24h24V0H0zm16.21 6.46c.13.38.2.8.18 1.25 0 .44-.08.87-.24 1.28a3.22 3.22 0 0 1-.7 1.07 3.39 3.39 0 0 1-1.22.74c-.51.19-1.13.29-1.87.29H10.3v4.48H8V5.57c.48-.07.95-.12 1.4-.15.45-.04.93-.05 1.44-.05 1.62 0 2.86.34 3.69 1.01l.68.08zm1.64 9.11c.45.36 1.08.58 1.73.58.29 0 .58-.04.85-.13.27-.09.51-.22.72-.38.2-.17.34-.38.43-.63h1.97c-.17.67-.48 1.22-.88 1.63-.4.41-.88.72-1.39.91-.51.18-1.05.27-1.6.27-.57 0-1.1-.07-1.58-.23-.48-.16-.89-.4-1.24-.72-.35-.32-.62-.72-.82-1.19-.2-.47-.29-1-.29-1.6 0-.56.09-1.08.29-1.54.2-.46.48-.86.83-1.18.35-.32.77-.58 1.24-.76.48-.18.99-.27 1.54-.27.63 0 1.19.12 1.67.36.48.25.88.57 1.2.98.32.41.55.88.69 1.39.14.51.17 1.04.11 1.59h-5.89c.01.48.17.91.42 1.27v-.01zm3.78-4.26c-.08.34-.21.64-.38.89-.18.25-.41.45-.69.59-.27.14-.61.21-1.01.21h-2.73v-3.76h2.59c.43 0 .79.07 1.08.2.29.14.53.32.71.55.18.23.31.49.38.79.08.29.11.6.09.91-.01.21-.02.41-.04.62z"/></svg>,
  'Illustrator': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.53 10.73c-.1-.31-.19-.61-.29-.92-.1-.31-.19-.6-.27-.89-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.13.51-.27.99-.38 1.43h2.54c-.06-.2-.12-.44-.2-.68-.09-.27-.17-.55-.26-.84l-.1-.09zm0 0"/><path d="M19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-5.07 17.57H12.5c-.12 0-.23-.04-.31-.13-.05-.06-.1-.13-.12-.21l-.78-2.55H7.46l-.68 2.52c-.03.11-.08.2-.17.28-.08.06-.2.09-.31.09H4.28l3.88-12.17c.04-.13.09-.27.14-.47.06-.2.1-.42.14-.65h2.78c.06 0 .12.02.17.04.04.03.07.07.09.13L15 17.56c.01.07-.01.15-.07.21-.05.07-.13.1-.22.1h-.03zm5.07-.44c0 .13-.05.25-.13.33a.446.446 0 0 1-.33.14h-1.97c-.13 0-.25-.05-.34-.14a.465.465 0 0 1-.14-.33V10.2c0-.13.05-.25.14-.34a.46.46 0 0 1 .34-.14h1.97c.13 0 .24.05.33.14.09.09.13.21.13.34v7.23zm-.18-9.4a1.335 1.335 0 0 1-1.04.42c-.41 0-.76-.13-1.04-.42a1.364 1.364 0 0 1-.42-1.01c0-.41.14-.74.42-1.01.28-.28.62-.42 1.04-.42s.77.14 1.04.42c.28.27.42.6.42 1.01s-.14.74-.42 1.01z"/></svg>,
  'After Effects': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zM11.28 17.6c-.04.13-.14.19-.27.19H8.87c-.17 0-.25-.08-.27-.22l-.78-2.55H4.58l-.68 2.52c-.03.14-.13.22-.28.22H1.65c-.17 0-.22-.08-.17-.25l3.78-12.08c.04-.15.08-.3.14-.48.05-.21.08-.42.11-.65h2.72c.09 0 .17.08.19.17l3.11 12.88c.02.07-.01.15-.08.22l-.11.03zm8.54-3.07c0 .08-.04.16-.11.22l-1.17.82c-.06.04-.13.06-.2.06a.34.34 0 0 1-.2-.09c-.26-.34-.5-.64-.73-.9-.63.66-1.46.99-2.48.99-.7 0-1.28-.2-1.75-.61s-.71-.95-.71-1.62c0-.5.13-.93.38-1.27.25-.35.6-.64 1.03-.86.44-.22.94-.4 1.51-.53.57-.13 1.16-.25 1.77-.34v-.16c0-.31-.1-.54-.3-.71-.2-.17-.5-.25-.89-.25-.32 0-.61.05-.87.15-.25.1-.5.24-.74.43l-.12.07a.1.1 0 0 1-.08.04c-.07 0-.14-.05-.2-.14l-.73-1.06c1.02-.85 2.13-1.28 3.34-1.28.94 0 1.69.24 2.23.71.55.47.82 1.15.82 2.01v5.26l-.01.01zm-5-2.3c-.13.16-.2.38-.2.66 0 .27.07.48.22.63.15.15.36.22.63.22.37 0 .69-.12.97-.38.28-.25.42-.62.42-1.11v-.48c-.38.07-.72.14-1.01.22-.3.08-.53.15-.7.22-.17.07-.26.14-.33.22v-.2z"/></svg>,
  'Premiere Pro': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zM14 16.15c-.6.35-1.38.53-2.34.53-.5 0-.84-.02-1.04-.05v-3.53c.26-.01.63-.02 1.1-.02.89 0 1.57.15 2.06.44.45.28.67.74.67 1.35.01.57-.18 1-.45 1.28zm.45-4.77c-.5.35-1.2.52-2.1.52-.42 0-.78-.02-1.08-.04V8.32c.28-.03.7-.05 1.24-.05.87 0 1.5.14 1.89.42.36.26.55.64.55 1.15.01.54-.18.96-.5 1.24v.3zm5.3 6.33c0 .13-.05.25-.13.34-.09.09-.21.13-.34.13h-1.97c-.13 0-.24-.04-.33-.13-.09-.09-.14-.21-.14-.34v-7.22c0-.13.05-.25.14-.34.08-.09.2-.14.33-.14h1.97c.13 0 .25.05.34.14.08.09.13.21.13.34v7.22z"/></svg>,
  'Blender': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.282 1.562-.815 2.106-.584.597-1.348.96-2.317 1.08a4.17 4.17 0 0 1-.425.022c-.61 0-1.158-.14-1.6-.398-.453-.267-.78-.63-.947-1.04-.2-.5-.286-1.09-.247-1.66l-.13-.11zm-7.668-5.08c.06-.83.49-1.56 1.1-2.07a3.63 3.63 0 0 1 2.35-.82c.9 0 1.73.31 2.35.82.63.51 1.04 1.24 1.1 2.07.05.85-.3 1.61-.87 2.18a3.88 3.88 0 0 1-2.46 1.12c-.15.01-.3.02-.45.02-.65 0-1.23-.15-1.7-.41-.48-.28-.83-.65-1.01-1.08-.21-.51-.3-1.12-.26-1.71l-.14-.12zM24 11.818c0 4.06-2.1 7.63-5.29 9.68-3.19 2.05-7.18 2.3-10.57.67-3.39-1.63-5.78-4.97-6.32-8.84a11.605 11.605 0 0 1 2.7-9.38C6.95 1.44 10.37.02 13.87.24c3.5.22 6.72 2.13 8.56 5.07A11.68 11.68 0 0 1 24 11.818z"/></svg>,
  'UI Design': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" /></svg>,
  'Prototypage': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L21.75 16.5 12 21.75 2.25 16.5l4.179-2.25m0 0 5.571 3 5.571-3" /></svg>,
  'Motion Design': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25c0 .621.504 1.125 1.125 1.125M18 10.875c0 .621-.504 1.125-1.125 1.125m0 0c-.621 0-1.125.504-1.125 1.125" /></svg>,
  'Responsive Design': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
};

export default function Home() {
  useScrollReveal();

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <Hero />

      {/* ABOUT */}
      <section className={styles.about} id="about">
        <div className="container">
          <div className={styles.aboutLayout}>
            <div className="reveal">
              <SectionLabel>À propos</SectionLabel>
              <h2 className="section-title">Développeur full stack<br/>& créatif digital.</h2>
            </div>
            <div className={`${styles.aboutText} reveal`}>
              <p>Je suis un développeur passionné qui fait le pont entre l'ingénierie et le design. Chaque projet est une occasion de construire quelque chose de solide, performant et visuellement marquant.</p>
              <p>Mon approche est simple : un code propre, une UX soignée et des résultats concrets pour vos utilisateurs.</p>
            </div>
            <div className={styles.aboutStats}>
              <div className={`${styles.aboutStat} reveal`}>
                <span className={styles.aboutStatNumber}>3+</span>
                <span className={styles.aboutStatLabel}>Années d'exp.</span>
              </div>
              <div className={`${styles.aboutStat} reveal`}>
                <span className={styles.aboutStatNumber}>30+</span>
                <span className={styles.aboutStatLabel}>Projets livrés</span>
              </div>
              <div className={`${styles.aboutStat} reveal`}>
                <span className={styles.aboutStatNumber}>100%</span>
                <span className={styles.aboutStatLabel}>Satisfaction</span>
              </div>
              <div className={`${styles.aboutStat} reveal`}>
                <span className={styles.aboutStatNumber}>15+</span>
                <span className={styles.aboutStatLabel}>Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETENCES - Carousel */}
      <section className={styles.skills} id="skills">
        <div className="container">
          <div className="reveal" style={{textAlign: 'center'}}>
            <SectionLabel style={{justifyContent: 'center'}}>Compétences</SectionLabel>
            <h2 className="section-title">Les outils que je maîtrise.</h2>
          </div>
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeLabel}>Développement</div>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'HTML5', 'CSS / SCSS', 'Git', 'Docker', 'Vercel', 'API REST', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'HTML5', 'CSS / SCSS', 'Git', 'Docker', 'Vercel', 'API REST'].map((tech, i) => (
                <span key={i} className={styles.marqueeItem}>
                  <TechLogo tech={tech} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.marqueeLabel}>Design & Graphisme</div>
          <div className={styles.marquee}>
            <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
              {['Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Blender', 'UI Design', 'Prototypage', 'Motion Design', 'Responsive Design', 'Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Blender', 'UI Design', 'Prototypage', 'Motion Design', 'Responsive Design'].map((tool, i) => (
                <span key={i} className={styles.marqueeItem}>
                  <TechLogo tech={tool} />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className={styles.projects} id="projects">
        <div className="container">
          <div className="reveal">
            <SectionLabel>Travaux sélectionnés</SectionLabel>
            <h2 className="section-title">Des projets qui parlent d'eux-mêmes.</h2>
            <p className="section-subtitle">Des solutions concrètes construites pour de vraies entreprises. Voici à quoi ressemble le développement stratégique en pratique.</p>
          </div>
          <div className={styles.projectsGrid}>
            <a href="/projects/boxe" className={`${styles.projectCard} reveal`} style={{ textDecoration: 'none' }}>
              {/* Full-width image showcase */}
              <div className={styles.projectPreview}>
                <img
                  src="/images/projects/boxing-preview.png"
                  alt="Boxing Club Premium - Site web premium pour club de boxe"
                  className={styles.projectImage}
                />
                {/* Hover overlay */}
                <div className={styles.projectOverlay}>
                  <button className={styles.projectOverlayBtn} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Explorer le projet
                  </button>
                </div>
              </div>

              {/* Project info */}
              <div className={styles.projectInfo}>
                <div className={styles.projectInfoHeader}>
                  <div className={styles.projectInfoHeaderLeft}>
                    <span className={styles.label}>Site Premium</span>
                    <h3>Boxing Club Premium</h3>
                  </div>
                  <button className={styles.projectViewBtnSmall} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Voir le site
                  </button>
                </div>
                <p>Site web premium pour un club de boxe avec une identité visuelle forte. Expérience immersive, animations sophistiquées et design élégant.</p>
                <div className={styles.projectTags}>
                  <span>Next.js 15</span>
                  <span>React 19</span>
                  <span>Tailwind CSS</span>
                  <span>Framer Motion</span>
                  <span>TypeScript</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>


      {/* METHOD */}
      <section className={styles.method} id="method">
        <div className="container">
          <div className="reveal">
            <SectionLabel>Ma méthode</SectionLabel>
            <h2 className="section-title">Comment je travaille.</h2>
          </div>
          <div className={styles.methodTimeline}>
            <div className={`${styles.methodCard} reveal`}>
              <span className={styles.methodNum}>01</span>
              <div>
                <h3>Analyse & Audit</h3>
                <p>Je comprends votre contexte, vos objectifs et vos utilisateurs avant d'écrire la moindre ligne.</p>
              </div>
            </div>
            <div className={`${styles.methodCard} reveal`}>
              <span className={styles.methodNum}>02</span>
              <div>
                <h3>Stratégie & Design</h3>
                <p>Maquettes et architecture technique alignées sur vos objectifs. Rien n'est construit sans un plan solide.</p>
              </div>
            </div>
            <div className={`${styles.methodCard} reveal`}>
              <span className={styles.methodNum}>03</span>
              <div>
                <h3>Développement</h3>
                <p>Code propre développé en sprints avec des points réguliers. Vous suivez l'avancement en temps réel.</p>
              </div>
            </div>
            <div className={`${styles.methodCard} reveal`}>
              <span className={styles.methodNum}>04</span>
              <div>
                <h3>Lancement & Suivi</h3>
                <p>Déploiement, tests et suivi post-lancement. Je m'assure que tout tourne parfaitement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contact} id="contact">
        <div className="container">
          <div className={styles.contactHeader}>
            <div className="reveal">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="section-title">Un projet en tête ?</h2>
            </div>
            <div className={`${styles.contactLinks} reveal`}>
              <a href="mailto:hello@matteotaubin.dev" className={styles.contactLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                hello@matteotaubin.dev
              </a>
              <span className={styles.contactDot}></span>
              <span className={styles.contactLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                Paris, France
              </span>
              <span className={styles.contactDot}></span>
              <span className={styles.contactAvail}>Disponible</span>
            </div>
          </div>
          <form className={`${styles.contactForm} reveal`} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formFields}>
              <div className={styles.formCol}>
                <input type="text" className={styles.formInput} placeholder="Nom" aria-label="Nom" />
                <input type="email" className={styles.formInput} placeholder="Email" aria-label="Email" />
                <input type="text" className={styles.formInput} placeholder="Sujet" aria-label="Sujet" />
              </div>
              <div className={styles.formCol}>
                <textarea className={styles.formTextarea} placeholder="Votre message..." aria-label="Message"></textarea>
              </div>
            </div>
            <div className={styles.formBottom}>
              <div className={styles.formSocials}>
                <a href="#" className={styles.formSocialLink} aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className={styles.formSocialLink} aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className={styles.formSocialLink} aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
              <button type="submit" className="btn btn-primary">
                Envoyer
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
