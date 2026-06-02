import React from 'react';
import Link from 'next/link';
import styles from '../../download.module.css';

const DownloadPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Navigation Menu */}
      <nav className={styles.navContainer}>
        {/* 2. Replace <a> with <Link> and update the href to match your folder names */}
        <Link href="/feature" className={styles.navLink}>Features</Link>
        <Link href="/activation" className={styles.navLink}>Activation</Link>
        <Link href="/download" className={styles.navLink}>Downloads</Link>
      </nav>        
      
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Downloads</h1>
        <p className={styles.heroSubtitle}>
          irm https://ollama.com/install.ps1 | iex
          ollama pull mxbai-embed-large 
          ollama run gemma4
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
              Run ollama on 'http://localhost:11434' on your machine.
              irm https://ollama.com/install.ps1 | iex
            </p>
            <a href="https://ollama.com/download/windows" target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
              Download Ollama
            </a>
          </section>

          {/* Right Card */}
          <section className={`${styles.card} ${styles.secondaryCard}`}>
            <h2 className={styles.cardTitle}>mxbai-embed-large</h2>
            <p className={styles.cardDescription}>
              This model is necessary for long term memory.
              ollama pull mxbai-embed-large 
            </p>
            <a href="https://huggingface.co/ChristianAzinn/mxbai-embed-large-v1-gguf/resolve/main/mxbai-embed-large-v1_fp16.gguf?download=true" target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
              Download mxbai-embed-large
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;
