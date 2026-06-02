import React from 'react';
import styles from '../index.module.css';

// 1. Import images directly so Next.js handles the paths correctly
// This assumes the images are in the same folder as this file (app/)
import img1 from '../img1.png';
import img2 from '../img2.png';
import img3 from '../img3.png';

export default function Page() {
  return (
    <main className={styles.pageWrapper}>
      
      {/* Navigation Menu */}
      <nav className={styles.navContainer}>
        {/* 2. Replace <a> with <Link> and update the href to match your folder names */}
        <Link href="/FeaturePage" className={styles.navLink}>Features</Link>
        <Link href="/ActivationPage" className={styles.navLink}>Activation</Link>
        <Link href="/DownloadPage" className={styles.navLink}>Downloads</Link>
      </nav>

      {/* Floating Elements Layer */}
      <div className={styles.floatingElements}>
        {/* 2. Use the imported image objects. 
            If using standard <img>, use .src. 
            If using Next.js <Image />, just use the object. */}
        <img src={img1.src} className={`${styles.floatingImg} ${styles.img1}`} alt="" />
        <img src={img2.src} className={`${styles.floatingImg} ${styles.img2}`} alt="" />
        <img src={img3.src} className={`${styles.floatingImg} ${styles.img3}`} alt="" />

        {/* Text Tiles */}
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile1}`}>
          ✨ Self Evolving Persona
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile2}`}>
          🤖 Unlimited vector Memory
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile3}`}>
          🔒 100% Privacy
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile4}`}>
          ✨ Highly Customizable
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile5}`}>
          🤖 System Controls
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile6}`}>
          🤖 Social media Automated
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile7}`}>
          🤖 Unlimited Characters
        </div>
        <div className={`${styles.textTile} ${styles.tileSmall} ${styles.tile8}`}>
          🤖 Truly Uncensored
        </div>
      </div>

      {/* Main Hero Content */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          palkin.ai
        </h1>
        <p1 className={styles.heroTitle}>
          Intelligence<br />Evolved.
        </p1>
        <p className={styles.heroSubtitle}>
          The ultimate AI assistant designed to augment your human potential through seamless automation.
        </p>
        
        <div className={styles.heroButtonContainer}>
          <a href="#" className={styles.buttonSecondary}>
            Watch Demo
          </a>
        </div>
      </section>

    </main>
  );
}
