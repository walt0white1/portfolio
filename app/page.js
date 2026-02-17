'use client';

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import styles from './page.module.css';

const SectionLabel = ({ children }) => (
  <span className="section-label">{children}</span>
);

export default function Home() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
          let delay = 0;
          siblings?.forEach((sib, i) => {
            if (sib === entry.target) delay = i * 100;
          });

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 400));

          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      {/* ABOUT */}
      <section className={styles.about} id="about">
        <div className="container">
          <div className={styles.grid}>
            <div className="reveal">
              <SectionLabel>À propos</SectionLabel>
              <h2 className="section-title">Créer des produits digitaux qui génèrent de vrais résultats.</h2>
              <p>
                Je suis un développeur full stack qui fait le pont entre l'ingénierie rigoureuse et le design réfléchi. Chaque ligne de code que j'écris a un objectif — qu'il s'agisse d'améliorer les temps de chargement, de perfectionner une interaction ou de faire évoluer une fonctionnalité en production.
              </p>
              <p>
                Je ne me contente pas de créer des fonctionnalités. Je construis des systèmes structurés, maintenables et optimisés dès le premier jour. Mon approche est orientée business : je comprends qu'un code de qualité ne sert à rien s'il ne convertit pas, ne performe pas et n'évolue pas avec votre croissance.
              </p>
              <p>
                Des interfaces au pixel près aux architectures backend robustes, je me concentre sur un travail qui respire la qualité — parce que vos utilisateurs remarquent la différence, et vos métriques aussi.
              </p>
            </div>
            <div className={styles.stats}>
              <div className={`${styles.statCard} reveal`}>
                <div className={styles.number}>3+</div>
                <div className={styles.label}>Années d'expérience</div>
              </div>
              <div className={`${styles.statCard} reveal`}>
                <div className={styles.number}>30+</div>
                <div className={styles.label}>Projets livrés</div>
              </div>
              <div className={`${styles.statCard} reveal`}>
                <div className={styles.number}>100%</div>
                <div className={styles.label}>Clients satisfaits</div>
              </div>
              <div className={`${styles.statCard} reveal`}>
                <div className={styles.number}>15+</div>
                <div className={styles.label}>Technologies maîtrisées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className={styles.skills} id="skills">
        <div className="container">
          <div className="reveal">
            <SectionLabel>Stack Technique</SectionLabel>
            <h2 className="section-title">Les technologies avec lesquelles je travaille.</h2>
            <p className="section-subtitle">Un ensemble d'outils et frameworks modernes, choisis pour leur fiabilité, leurs performances et leur expérience développeur.</p>
          </div>
          <div className={styles.skillsGrid}>
            <div className={`${styles.skillCard} reveal`}>
              <h3>Frontend</h3>
              <p>Création d'interfaces réactives et interactives avec des frameworks modernes et une attention extrême aux détails.</p>
              <div className={styles.tags}>
                <span>HTML5</span>
                <span>CSS / SCSS</span>
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>React</span>
                <span>Next.js</span>
                <span>Tailwind CSS</span>
              </div>
            </div>
            <div className={`${styles.skillCard} reveal`}>
              <h3>Backend</h3>
              <p>Construction de solutions serveur sécurisées et scalables avec une conception d'API robuste et des flux d'authentification éprouvés.</p>
              <div className={styles.tags}>
                <span>Node.js</span>
                <span>Express</span>
                <span>API REST</span>
                <span>Authentification</span>
                <span>Gestion serveur</span>
              </div>
            </div>
            <div className={`${styles.skillCard} reveal`}>
              <h3>Bases de données</h3>
              <p>Conception de modèles de données et de requêtes efficaces pour les systèmes relationnels et orientés documents.</p>
              <div className={styles.tags}>
                <span>MongoDB</span>
                <span>PostgreSQL</span>
                <span>MySQL</span>
                <span>Prisma</span>
              </div>
            </div>
            <div className={`${styles.skillCard} reveal`}>
              <h3>Outils & Environnement</h3>
              <p>Utilisation des meilleurs outils pour le versioning, le déploiement et les workflows de design collaboratif.</p>
              <div className={styles.tags}>
                <span>Git / GitHub</span>
                <span>Vercel</span>
                <span>Figma</span>
                <span>Docker</span>
                <span>VS Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className={styles.expertise} id="expertise">
        <div className="container">
          <div className="reveal">
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="section-title">Ce que j'apporte à chaque projet.</h2>
            <p className="section-subtitle">Des domaines d'expertise ciblés, affinés au fil de projets concrets et d'une veille technologique continue.</p>
          </div>
          <div className={styles.expertiseGrid}>
            <div className={`${styles.expertiseCard} reveal`}>
              <h3>Développement Full Stack</h3>
              <p>Des solutions de bout en bout — de la conception de la base de données à la livraison frontend — avec une architecture propre à chaque niveau.</p>
            </div>
            <div className={`${styles.expertiseCard} reveal`}>
              <h3>UI / UX Moderne</h3>
              <p>Des interfaces qui s'utilisent de façon intuitive et qui en imposent visuellement. Chaque interaction est intentionnelle, chaque pixel est placé avec soin.</p>
            </div>
            <div className={`${styles.expertiseCard} reveal`}>
              <h3>Optimisation des performances</h3>
              <p>Temps de chargement rapides, bundles optimisés et rendu efficace. La vitesse est une fonctionnalité, pas une option.</p>
            </div>
            <div className={`${styles.expertiseCard} reveal`}>
              <h3>Responsive & Mobile-First</h3>
              <p>Chaque projet est conçu mobile-first. Des mises en page fluides qui s'adaptent parfaitement à tous les formats d'écran.</p>
            </div>
            <div className={`${styles.expertiseCard} reveal`}>
              <h3>Refonte stratégique</h3>
              <p>Transformer des sites dépassés en plateformes modernes. Meilleure UX, conversion améliorée, présence de marque renforcée.</p>
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
            <div className={`${styles.projectCard} reveal`}>
              <div className={styles.projectPreview}>
                <div className={styles.mockup}>
                  <div className={styles.mockupBar}>
                    <span></span><span></span><span></span>
                  </div>
                  <div className={styles.mockupContent}></div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <span className={styles.label}>E-Commerce</span>
                <h3>NovaMart</h3>
                <p>Une plateforme e-commerce haute performance pour une marque retail en croissance qui souffrait de temps de chargement longs et d'un taux de conversion mobile insuffisant.</p>
                <div className={styles.meta}>
                  <div><strong>Problème :</strong> 6s de chargement, 1,2% de conversion mobile</div>
                  <div><strong>Solution :</strong> Next.js SSR, optimisation images, tunnel d'achat repensé</div>
                  <div><strong>Résultat :</strong> 1,4s de chargement, 3,8% de conversion (+216%)</div>
                </div>
                <div className={styles.projectTags}>
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>MongoDB</span>
                  <span>Tailwind</span>
                  <span>Stripe</span>
                </div>
              </div>
            </div>

            <div className={`${styles.projectCard} reveal`}>
              <div className={styles.projectPreview}>
                <div className={styles.mockup}>
                  <div className={styles.mockupBar}>
                    <span></span><span></span><span></span>
                  </div>
                  <div className={styles.mockupContent}></div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <span className={styles.label}>SaaS Dashboard</span>
                <h3>InsightBoard</h3>
                <p>Un tableau de bord analytique en temps réel pour une startup SaaS B2B qui devait remplacer un ancien panneau d'administration par une interface moderne et orientée données.</p>
                <div className={styles.meta}>
                  <div><strong>Problème :</strong> UI obsolète, rendu lent, UX défaillante</div>
                  <div><strong>Solution :</strong> SPA React avec listes virtualisées, API REST</div>
                  <div><strong>Résultat :</strong> Données 60% plus rapides, 45% de tickets support en moins</div>
                </div>
                <div className={styles.projectTags}>
                  <span>React</span>
                  <span>Node.js</span>
                  <span>PostgreSQL</span>
                  <span>Chart.js</span>
                  <span>Docker</span>
                </div>
              </div>
            </div>

            <div className={`${styles.projectCard} reveal`}>
              <div className={styles.projectPreview}>
                <div className={styles.mockup}>
                  <div className={styles.mockupBar}>
                    <span></span><span></span><span></span>
                  </div>
                  <div className={styles.mockupContent}></div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <span className={styles.label}>Site vitrine</span>
                <h3>Verdant Studio</h3>
                <p>Une refonte complète de marque et de site pour une agence de design souhaitant se repositionner sur le segment premium du marché.</p>
                <div className={styles.meta}>
                  <div><strong>Problème :</strong> Branding daté, faible trafic organique, rebond élevé</div>
                  <div><strong>Solution :</strong> Site Next.js SEO-first, design moderne, CMS</div>
                  <div><strong>Résultat :</strong> +180% de trafic organique, taux de rebond réduit de 42%</div>
                </div>
                <div className={styles.projectTags}>
                  <span>Next.js</span>
                  <span>SCSS</span>
                  <span>Sanity CMS</span>
                  <span>Vercel</span>
                  <span>SEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className={styles.method} id="method">
        <div className="container">
          <div className={styles.methodIntro}>
            <SectionLabel style={{justifyContent: 'center'}}>Ma méthode</SectionLabel>
            <h2 className="section-title" style={{textAlign: 'center'}}>Comment je travaille.</h2>
            <p className="section-subtitle" style={{margin: '0 auto', textAlign: 'center'}}>Un workflow structuré et transparent conçu pour livrer des résultats prévisibles — sans mauvaises surprises, sans temps perdu.</p>
          </div>
          <div className={styles.methodGrid}>
            <div className={`${styles.methodStep} reveal`}>
              <div className={styles.number}>01</div>
              <h3>Analyse & Audit</h3>
              <p>Plongée en profondeur dans votre contexte actuel, vos objectifs business et vos utilisateurs cibles. J'identifie ce qui fonctionne, ce qui bloque et où se trouvent les vraies opportunités.</p>
            </div>
            <div className={`${styles.methodStep} reveal`}>
              <div className={styles.number}>02</div>
              <h3>Stratégie & Design</h3>
              <p>Maquettes, direction artistique et architecture technique — alignées sur vos objectifs. Rien n'est construit avant que le plan soit solide.</p>
            </div>
            <div className={`${styles.methodStep} reveal`}>
              <div className={styles.number}>03</div>
              <h3>Développement</h3>
              <p>Code propre et modulaire développé en sprints avec des points réguliers. Vous suivez l'avancement en temps réel et pouvez donner votre avis à chaque étape.</p>
            </div>
            <div className={`${styles.methodStep} reveal`}>
              <div className={styles.number}>04</div>
              <h3>Lancement & Optimisation</h3>
              <p>Déploiement, tests de performance et suivi post-lancement. Je ne disparais pas après la livraison — je m'assure que tout tourne parfaitement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ME */}
      <section className={styles.why} id="why">
        <div className="container">
          <div className="reveal">
            <SectionLabel>Pourquoi moi</SectionLabel>
            <h2 className="section-title">Ce qui fait la différence.</h2>
            <p className="section-subtitle">Au-delà des compétences techniques — voici pourquoi les clients choisissent de travailler avec moi et reviennent.</p>
          </div>
          <div className={styles.whyGrid}>
            <div className={`${styles.whyCard} reveal`}>
              <h3>Communication directe</h3>
              <p>Pas d'intermédiaires. Vous échangez directement avec la personne qui écrit votre code. Réponses rapides, mises à jour claires, zéro friction.</p>
            </div>
            <div className={`${styles.whyCard} reveal`}>
              <h3>Attention aux détails</h3>
              <p>Les petites choses comptent. Espacement cohérent, transitions fluides, états d'erreur soignés — je traque les détails pour que vos utilisateurs n'aient pas à le faire.</p>
            </div>
            <div className={`${styles.whyCard} reveal`}>
              <h3>Qualité avant quantité</h3>
              <p>Je travaille sur un nombre limité de projets pour garantir focus et qualité. Quand je travaille avec vous, vous avez mon engagement total.</p>
            </div>
            <div className={`${styles.whyCard} reveal`}>
              <h3>Flexible & adaptable</h3>
              <p>Les plans évoluent, les priorités changent. Je m'adapte rapidement sans jamais compromettre la qualité du code ni les délais de livraison.</p>
            </div>
            <div className={`${styles.whyCard} reveal`}>
              <h3>Vision long terme</h3>
              <p>Je conçois avec la scalabilité en tête. Architecture propre, code maintenable qui vous sert bien au-delà du jour du lancement.</p>
            </div>
            <div className={`${styles.whyCard} reveal`}>
              <h3>Accompagnement personnalisé</h3>
              <p>Chaque projet reçoit une approche sur mesure. Je prends le temps de comprendre votre contexte, vos contraintes et vos ambitions avant d'écrire la moindre ligne.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} id="contact">
        <div className="container">
          <div className={styles.ctaContent}>
            <div className="reveal" style={{textAlign: 'center'}}>
              <SectionLabel style={{justifyContent: 'center'}}>Contactez-moi</SectionLabel>
              <h2 className="section-title">Prêt à construire quelque chose <span style={{background: 'linear-gradient(135deg, var(--accent-light), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>d'exceptionnel</span>&nbsp;?</h2>
              <p className="section-subtitle" style={{margin: '0 auto'}}>
                Que vous ayez besoin d'une nouvelle application web, d'une refonte ou d'une expertise technique sur un projet existant — je suis là pour transformer votre vision en produit digital haute performance.
              </p>
              <div className={styles.ctaButtons}>
                <a href="mailto:hello@matteotaubin.dev" className="btn btn-primary">
                  Démarrer une conversation
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                </a>
                <a href="#projects" className="btn btn-secondary">Voir mes projets</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
