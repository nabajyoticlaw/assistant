import React from 'react';
import styles from '../../download.module.css';

const DownloadPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Downloads</h1>
        <p className={styles.heroSubtitle}>
          Access the complete AI toolkit and local models.
        </p>
      </header>

      <main className={styles.mainContainer}>
        {/* Apex Card */}
        <section className={`${styles.card} ${styles.featuredCard}`}>
          <h2 className={styles.cardTitle}>Assistant Package</h2>
          <p className={styles.cardDescription}>
            Download the complete bundled environment containing all necessary configurations and assets.
          </p>
          <a href="/assistant.zip" className={styles.buttonPrimary} download="assistant.zip">
            Download assistant.zip
          </a>
        </section>

        {/* Base Grid */}
        <div className={styles.secondaryGrid}>
          {/* Left Card */}
          <section className={`${styles.card} ${styles.secondaryCard}`}>
            <h2 className={styles.cardTitle}>Ollama App</h2>
            <p className={styles.cardDescription}>
              The easiest way to run large language models locally on your machine.
            </p>
            <a href="https://ollama.com" target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
              Download Ollama
            </a>
          </section>

          {/* Right Card */}
          <section className={`${styles.card} ${styles.secondaryCard}`}>
            <h2 className={styles.cardTitle}>mxbai-embed-large</h2>
            <p className={styles.cardDescription}>
              High-performance embedding model available via HuggingFace repositories.
            </p>
            <a href="https://huggingface.co/" target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
              View on HuggingFace
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;
