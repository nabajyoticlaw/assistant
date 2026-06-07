import React from 'react';
import Link from 'next/link';
import styles from '../index.module.css';

// 1. Import images directly
import img1 from '../img1.png';
import img2 from '../img2.png';
import img3 from '../img3.png';

export default function Page() {
  return (
    <main className={styles.pageWrapper}>
      
      {/* Navigation Menu - Stays as is */}
      <nav className={styles.navContainer}>
        <Link href="/feature" className={styles.navLink}>Features</Link>
        <Link href="/activation" className={styles.navLink}>Activation</Link>
        <Link href="/download" className={styles.navLink}>Downloads</Link>
      </nav>

      {/* Floating Elements Layer - Now acting as Background Texture */}
      <div className={styles.floatingElements}>
        <img src={img1.src} className={`${styles.floatingImg} ${styles.img1}`} alt="" />
        <img src={img2.src} className={`${styles.floatingImg} ${styles.img2}`} alt="" />
        <img src={img3.src} className={`${styles.floatingImg} ${styles.img3}`} alt="" />

        {/* Text Tiles - Now purely artistic, no boxes/borders */}
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile1}`}>
          🧬 Self Evolving Persona
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile2}`}>
          🧠 Unlimited Vector Memory
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile3}`}>
          🔒 100% Privacy
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile4}`}>
          🎨 Highly Customizable
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile5}`}>
          ⚙️ System Controls
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile6}`}>
          📱 Social Media Automated
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile7}`}>
          👥 Unlimited Characters
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile8}`}>
          🔓 Truly Uncensored
        </div>
      </div>

      {/* Main Hero Content - High Z-Index to stay on top */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          irish AI
        </h1>
        {/* We use a specific class here to decrease thickness by 50% */}
        <p className={styles.heroSubTitle}>
          Intelligence<br />Evolved.
        </p>
        <p className={styles.heroSubtitle}>
          The ultimate AI assistant designed to augment your human potential through seamless automation.
        </p>
        
        <div className={styles.heroButtonContainer}>
          <a href="https://github.com/nabajyoticlaw/distrbution/releases/download/v1.0.0/irish_AI.zip" className={styles.buttonSecondary}>
            Try It
          </a>
        </div>
      </section>

    </main>
  );
}
