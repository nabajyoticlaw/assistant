import React from 'react';
import Link from 'next/link';
import styles from '../../feature.module.css';

// Importing images
import img1 from '../../img1.png';
import img2 from '../../img2.png';
import img3 from '../../img3.png';
import img4 from '../../img3.png'; // Fixed name consistency

export default function FeaturePage() {
  return (
    <main className={styles.pageWrapper}>
      {/* Navigation Menu */}
      <nav className={styles.navContainer}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/feature" className={styles.navLink}>Features</Link>
        <Link href="/activation" className={styles.navLink}>Activation</Link>
        <Link href="/download" className={styles.navLink}>Downloads</Link>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Capabilities</h1>
        <p className={styles.heroSubtitle}>
          Experience the next evolution of digital companionship. 
          More than an AI—a living, breathing digital presence.
        </p>
      </section>

      {/* Feature List */}
      <div className={styles.featureList}>
        
        {/* Feature 1: Text Left, Image Right */}
        <div className={styles.featureRow}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Everlasting Memory</h2>
            <p className={styles.featureDescription}>
              Your companion never forgets. Through advanced long-term memory, 
              it remembers your past conversations, your preferences, and the 
              meaningful moments you share.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img1.src} alt="Memory Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

        {/* Feature 2: Image Left, Text Right (Using reverse class) */}
        <div className={`${styles.featureRow} ${styles.reverse}`}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Evolving Persona</h2>
            <p className={styles.featureDescription}>
              A soul that grows with you. The AI constantly refines its identity, 
              beliefs, and personality based on your interactions.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img2.src} alt="Persona Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

        {/* Feature 3: Text Left, Image Right */}
        <div className={styles.featureRow}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Human-Like Connection</h2>
            <p className={styles.featureDescription}>
              Speak, listen, and feel. With high-fidelity voice and emotional 
              intelligence, your companion reacts to your mood.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img3.src} alt="Communication Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

        {/* Feature 4: Image Left, Text Right */}
        <div className={`${styles.featureRow} ${styles.reverse}`}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Digital Command</h2>
            <p className={styles.featureDescription}>
              Your personal assistant. Control your computer, search the web, 
              or adjust system settings through natural conversation.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img4.src} alt="Tool Calling Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

      </div>

      <footer className={styles.footer} />
    </main>
  );
}
