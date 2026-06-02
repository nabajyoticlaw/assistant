import React from 'react';
import styles from '../index.module.css';

const Page = () => {
  return (
    <main className={styles.pageWrapper}>
      {/* Navigation Menu */}
      <nav className={styles.navContainer}>
        <a href="#" className={styles.navLink}>Features</a>
        <a href="#" className={styles.navLink}>Activation</a>
        <a href="#" className={styles.navLink}>Downloads</a>
      </nav>

      {/* Floating Elements Layer */}
      <div className={styles.floatingElements}>
        {/* Large Images - Ensure these files exist in your /public folder */}
        <img src="../img1.png" className={`${styles.floatingImg} ${styles.img1}`} alt="" />
        <img src="../img2.png" className={`${styles.floatingImg} ${styles.img2}`} alt="" />
        <img src="../img3.png" className={`${styles.floatingImg} ${styles.img3}`} alt="" />

        {/* Text Tiles */}
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile1}`}>
          ✨ High Intelligence
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile2}`}>
          🤖 Unlimited vector Memory
        </div>
        <div className={`${styles.textTile} ${styles.tileLarge} ${styles.tile3}`}>
          🔒 100% Privacy First
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
      </div>

      {/* Main Hero Content */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Intelligence<br />Evolved.
        </h1>
        <p className={styles.heroSubtitle}>
          The ultimate AI assistant designed to augment your human potential through seamless automation.
        </p>
        
        <div className={styles.heroButtonContainer}>
          <a href="#" className={styles.buttonSecondary}>
            Explore the Future
          </a>
        </div>
      </section>
    </main>
  );
};

export default Page;
