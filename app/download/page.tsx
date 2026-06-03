import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../download.module.css';

// Helper Component for the Command Line UI
const CommandSnippet: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className={styles.commandBox}>
      <code className={styles.commandText}>{code}</code>
      <button 
        onClick={handleCopy} 
        className={styles.copyButton}
        aria-label="Copy command"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

const DownloadPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Navigation Menu - Kept exactly as requested */}
      <nav className={styles.navContainer}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/feature" className={styles.navLink}>Features</Link>
        <Link href="/activation" className={styles.navLink}>Activation</Link>
        <Link href="/download" className={styles.navLink}>Downloads</Link>
      </nav>        
      
      {/* Hero Section - Kept exactly as requested */}
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Downloads</h1>
        <p className={styles.heroSubtitle}>
          All the files below are necessary for the app to run. This App works with Windows Only.
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
            </p>
            
            {/* New Command Line Section */}
            <CommandSnippet code="irm https://ollama.com/install.ps1 | iex" />

            <div className={styles.buttonWrapper}>
              <a href="https://ollama.com/download/windows" target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
                Download Ollama
              </a>
            </div>
          </section>

          {/* Right Card */}
          <section className={`${styles.card} ${styles.secondaryCard}`}>
            <h2 className={styles.cardTitle}>mxbai-embed-large</h2>
            <p className={styles.cardDescription}>
              This model is necessary for long term memory.
            </p>

            {/* New Command Line Section */}
            <CommandSnippet code="ollama pull mxbai-embed-large" />

            <div className={styles.buttonWrapper}>
              <a href="https://huggingface.co/ChristianAzinn/mxbai-embed-large-v1-gguf/resolve/main/mxbai-embed-large-v1_fp16.gguf?download=true" target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
                Download mxbai-embed-large
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;
