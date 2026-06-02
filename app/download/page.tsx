import React from 'react';
import styles from '../../download.module.css';

const DownloadPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Downloads</h1>
        <p className={styles.heroSubtitle}>
          Access the complete AI toolkit and local models.
        </p>
      </header>

      <main className={styles.mainContainer}>
        {/* 1. The Apex (Top Card) */}
        <section className={`${styles.card} ${styles.featuredCard}`}>
          <h2 className={styles.cardTitle}>Assistant Package</h2>
          <p className={styles.cardDescription}>
            Download the complete bundled environment containing all necessary configurations and assets.
          </p>
          <a 
            href="/path-to-your-file/assistant.zip" 
            className={styles.buttonPrimary}
            download="assistant.zip"
          >
            Download assistant.zip
          </a>
        </section>

        {/* 2. The Base (Bottom Row) */}
        <div className={styles.secondaryGrid}>
          {/* Ollama Card (Left side of triangle) */}
          <section className={`${styles.card} ${styles.secondaryCard}`}>
            <h2 className={styles.cardTitle}>Ollama App</h2>
            <p className={styles.cardDescription}>
              The easiest way to run large language models locally on your machine.
            </p>
            <a 
              href="https://ollama.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.buttonSecondary}
            >
              Download Ollama
            </a>
          </section>

          {/* mxbai Card (Right side of triangle) */}
          <section className={`${styles.card} ${styles.secondaryCard}`}>
            <h2 className={styles.cardTitle}>mxbai-embed-large</h2>
            <p className={styles.cardDescription}>
              High-performance embedding model available via HuggingFace repositories.
            </p>
            <a 
              href="https://huggingface.co/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.buttonSecondary}
            >
              View on HuggingFace
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;
