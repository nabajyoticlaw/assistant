import React from 'react';
import styles from '../../download.module.css';

const DownloadPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Downloads</h1>
        <p className={styles.heroSubtitle}>
          Get everything you need to run your local AI ecosystem.
        </p>
      </header>

      <main className={styles.mainContainer}>
        {/* Main Featured Card */}
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

        {/* Secondary Cards Grid */}
        <div className={styles.secondaryGrid}>
          {/* Ollama Card */}
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

          {/* HuggingFace Card */}
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
