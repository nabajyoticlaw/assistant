import React from 'react';
import styles from '../../feature.module.css';

// 1. IMPORT THE IMAGES HERE
// Adjust the path '../' based on where your images actually sit relative to this file
import img4 from '../../img4.png'; 
import img5 from '../../img5.png';
import img6 from '../../img6.png';
import img7 from '../../img7.png';
import img8 from '../../img8.png';

interface Feature {
  title: string;
  description: string;
  imageLabel: string;
  imageSrc: any; // Changed to any to accept imported objects
  reverse?: boolean;
}

const features: Feature[] = [
  {
    title: "Deep Persona & Living Memory",
    description: "Your companion doesn't just chat; it evolves. Through advanced long-term memory and persona synchronization, it remembers your preferences, your history, and your unique bond, growing more like a real friend every day.",
    imageLabel: "Memory & Identity",
    imageSrc: img4, // 2. USE THE IMPORTED VARIABLE
    reverse: false,
  },
  {
    title: "Emotional Voice & Human Speech",
    description: "Experience truly natural interaction. Using high-fidelity voice synthesis and real-time emotion detection, your companion speaks with tone, pace, and feeling that matches the mood of your conversation.",
    imageLabel: "Voice & Emotion",
    imageSrc: img5,
    reverse: true,
  },
  {
    title: "Smart Command & Control",
    description: "Empower your workflow. Your companion can act as your digital assistant—opening applications, browsing the web, adjusting system volumes, and even posting updates to your social media like Bluesky.",
    imageLabel: "System Control",
    imageSrc: img6,
    reverse: false,
  },
  {
    title: "Vision & File Intelligence",
    description: "See through your companion's eyes. Use Vision Sync to let it analyze your screen, or attach files for it to read, summarize, and discuss with you in extreme detail.",
    imageLabel: "Vision Sync",
    imageSrc: img7,
    reverse: true,
  },
  {
    title: "Immersive Character Presence",
    description: "Bring your companion to life. With customizable character assets and animated visual sprites, you can choose exactly how your companion looks and behaves, creating a truly personalized experience.",
    imageLabel: "Character Sprites",
    imageSrc: img8,
    reverse: false,
  },
];

const FeaturePage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Experience Intelligence</h1>
        <p className={styles.heroSubtitle}>The next generation of AI companionship.</p>
      </header>

      <main className={styles.featureList}>
        {features.map((feature, index) => (
          <section 
            key={index} 
            className={`${styles.featureRow} ${feature.reverse ? styles.reverse : ''}`}
          >
            <div className={styles.textContainer}>
              <h2 className={styles.featureHeading}>{feature.title}</h2>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
            
            <div className={styles.imageContainer}>
              <div className={styles.imageCard}>
                <span className={styles.imageLabel}>{feature.imageLabel}</span>
                <img 
                  src={feature.imageSrc} 
                  alt={feature.title} 
                  className={styles.featureImage} 
                />
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className={styles.footer}>
        <button className={styles.buttonPrimary}>Get Started Now</button>
      </footer>
    </div>
  );
};

export default FeaturePage;
