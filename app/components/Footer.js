import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.text}>&copy; 2026 Matteo Taubin. Tous droits réservés.</p>
          <div className={styles.links}>
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="mailto:hello@matteotaubin.dev">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
