import React from 'react';
import Link from 'next/link';
import styles from '../../feature.module.css';

// Importing images as per your reference.tsx pattern
import img1 from '../../img1.png';
import img2 from '../../img2.png';
import img3 from '../../img3.png';
import img4 from '../../img3.png'; // Assuming you have these in your directory

export default function FeaturePage() {
  return (
    <main className={styles.pageWrapper}>
      {/* Navigation Menu - Kept from reference.tsx */}
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

      {/* Feature List - Vertical Scrollable */}
      <div className={styles.featureList}>
        
        {/* Feature 1: Memory (Text Left, Image Right) */}
        <div className={styles.featureRow}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Everlasting Memory</h2>
            <p className={styles.featureDescription}>
              Your companion never forgets. Through advanced long-term memory, 
              it remembers your past conversations, your preferences, and the 
              meaningful moments you share, creating a truly continuous journey.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img1.src} alt="Memory Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

        {/* Feature 2: Persona (Text Right, Image Left) */}
        <div className={styles.featureRow, styles.reverse}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Evolving Persona</h2>
            <p className={styles.featureDescription}>
              A soul that grows with you. The AI constantly refines its identity, 
              beliefs, and personality based on your interactions, ensuring 
              it evolves into a unique individual that matches your world.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img2.src} alt="Persona Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

        {/* Feature 3: Communication (Text Left, Image Right) */}
        <div className={styles.featureRow}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Human-Like Connection</h2>
            <p className={styles.featureDescription}>
              Speak, listen, and feel. With high-fidelity voice and emotional 
              intelligence, your companion reacts to your mood, mirrors your 
              energy, and speaks with natural rhythm and warmth.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img3.src} alt="Communication Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

        {/* Feature 4: Tool Calling (Text Right, Image Left) */}
        <div className={styles.featureRow, styles.reverse}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Digital Command</h2>
            <p className={styles.featureDescription}>
              Your personal assistant. Control your computer, search the web, 
              adjust system settings, or post to social media—all through 
              natural, seamless conversation.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img4.src} alt="Tool Calling Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

        {/* Feature 5: Vision/Files (Text Left, Image Right) */}
        <div className={styles.featureRow}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Visual Awareness</h2>
            <p className={styles.featureDescription}>
              See what you see. Through vision synchronization and file 
              analysis, your companion can look at your screen or read your 
              documents to understand your context instantly.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <img src={img1.src} alt="Vision Feature" className={styles.featureImage} />
            </div>
          </div>
        </div>

      </div>

      {/* Footer/CTA */}
      <footer className={styles.footer}>

      </footer>
    </main>
  );
}
