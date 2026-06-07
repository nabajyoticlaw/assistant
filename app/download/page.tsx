"use client";

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
      {/* Navigation Menu */}
      <nav className={styles.navContainer}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/feature" className={styles.navLink}>Features</Link>
        <Link href="/activation" className={styles.navLink}>Activation</Link>
        <Link href="/download" className={styles.navLink}>Downloads</Link>
      </nav>        
      
      {/* Hero Section */}
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Downloads</h1>
        <p className={styles.heroSubtitle}>
          All the files below are necessary for the app to run. This App works with Windows Only.
        </p>
      </header>

      <main className={styles.mainContainer}>
        {/* Apex Card */}
        <section className={`${styles.card} ${styles.featuredCard}`}>
          <h2 className={styles.cardTitle}>Complete Package</h2>
          <p className={styles.cardDescription}>
            Download the complete bundled environment containing all necessary configurations and assets.
          </p>
          <a href="https://github.com/nabajyoticlaw/distrbution/releases/download/v1.0.0/irish_AI.zip" className={styles.buttonPrimary} download="irish_AI.zip(v1.0.0)">
            Download irish_AI.zip
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

            <CommandSnippet code="ollama pull mxbai-embed-large" />

            <div className={styles.buttonWrapper}>
              <a href="https://huggingface.co/ChristianAzinn/mxbai-embed-large-v1-gguf/resolve/main/mxbai-embed-large-v1_fp16.gguf?download=true" target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
                Download mxbai-embed-large
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* --- NEW: Setup Instructions Section --- */}
      <section className={styles.instructionsSection}>
        <div className={styles.instructionsCard}>
          <h2 className={styles.cardTitle}>🛠️ Setup Instructions</h2>
          <div className={styles.instructionsList}>
            <div className={styles.instructionItem}>
              <strong>Ollama (AI Engine) 🧠</strong>
              <p>Purpose: Runs the local AI brain. Action: Download and install from <a href="https://ollama.com" className={styles.link}>ollama.com</a>.</p>
            </div>
            <div className={styles.instructionItem}>
              <strong>espeak-ng (optional) 🗣️</strong>
              <p>Purpose: Enables high-quality, multi-language voice capabilities. Action: Install espeak-ng system-wide.</p>
            </div>
            <div className={styles.instructionItem}>
              <strong>AI Models 📚</strong>
              <p>Purpose: Provides the actual intelligence for the companion. Action: Open your terminal and run: <code>ollama pull [model_name]</code> (e.g., <code>ollama pull llama3</code>).</p>
            </div>
            <div className={styles.instructionItem}>
              <strong>Tavily API Key (Web Access) 🌐</strong>
              <p>Purpose: Enables the AI to search the internet for real-time info. Action: Set your <code>TAVILY_API_KEY</code> as a system environment variable.</p>
            </div>
            <div className={styles.instructionItem}>
              <strong>Gemini API Key (Online LLM) 🤖</strong>
              <p>Purpose: Enables the AI to work on the internet if local LLM unavailable . Action: Set your <code>GEMINI_API_KEY</code> as a system environment variable.</p>
            </div>
            <div className={styles.instructionItem}>
              <strong>Audio Hardware (optional) 🎤</strong>
              <p>Purpose: Required for voice-to-voice interaction. Action: Connect a working Microphone and Speakers/Headphones.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadPage;
