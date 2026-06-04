"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Optimized Image component
import Script from 'next/script'; // For Schema Markup
import styles from '../../feature.module.css';

// Importing images
import img1 from '../../img7.png';
import img2 from '../../img5.png';
import img3 from '../../img4.png';
import img4 from '../../img6.png';

export default function FeaturePage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Prevent background scrolling when image is expanded
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImg]);

  return (
    <main className={styles.pageWrapper}>
      {/* 1. JSON-LD Schema Markup (Tells Google this is a Software Product) */}
      <Script
        id="schema-markup"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "IRISH AI",
            "operatingSystem": "Windows, macOS, Linux",
            "applicationCategory": "Artificial Intelligence",
            "description": "IRISH is a private, evolving digital AI companion that provides long-term memory, human-like voice, and digital command capabilities.",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            }
          }),
        }}
      />

      {/* Navigation Menu */}
      <nav className={styles.navContainer} aria-label="Main Navigation">
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/feature" className={styles.navLink}>Features</Link>
        <Link href="/activation" className={styles.navLink}>Activation</Link>
        <Link href="/download" className={styles.navLink}>Downloads</Link>
      </nav>

      {/* Hero Section - Optimized H1 */}
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>IRISH AI Capabilities & Features</h1>
        <p className={styles.heroSubtitle}>
          Experience the next evolution of digital companionship. More than an AI—a living, breathing digital presence.
        </p>
      </header>

      {/* Feature List */}
      <div className={styles.featureList}>
        
        {/* Feature 1 - Optimized Alt Text & Image */}
        <div className={styles.featureRow}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Advanced Long-Term AI Memory</h2>
            <p className={styles.featureDescription}>
              Your companion never forgets. Through advanced long-term memory, 
              it remembers your past conversations, your preferences, and the 
              meaningful moments you share.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <Image 
                src={img1} 
                alt="IRISH AI Everlasting Memory Feature" 
                className={styles.featureImage} 
                onClick={() => setSelectedImg(img1.src)}
                placeholder="blur"
              />
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className={`${styles.featureRow} ${styles.reverse}`}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Evolving AI Persona</h2>
            <p className={styles.featureDescription}>
              A soul that grows with you. The AI constantly refines its identity, 
              beliefs, and personality based on your unique interactions.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <Image 
                src={img2} 
                alt="Evolving AI Persona and Personality Technology" 
                className={styles.featureImage} 
                onClick={() => setSelectedImg(img2.src)}
                placeholder="blur"
              />
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className={styles.featureRow}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Human-Like AI Connection</h2>
            <p className={styles.featureDescription}>
              Speak, listen, and feel. With high-fidelity voice and emotional 
              intelligence, your companion reacts to your mood.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <Image 
                src={img3} 
                alt="Human-like AI Voice and Emotional Intelligence" 
                className={styles.featureImage} 
                onClick={() => setSelectedImg(img3.src)}
                placeholder="blur"
              />
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className={`${styles.featureRow} ${styles.reverse}`}>
          <div className={styles.textContainer}>
            <h2 className={styles.featureHeading}>Digital AI Command & Control</h2>
            <p className={styles.featureDescription}>
              Your personal assistant. Control your computer, search the web, 
              or adjust system settings through natural conversation.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageCard}>
              <Image 
                src={img4} 
                alt="Digital AI Assistant Command and Control Feature" 
                className={styles.featureImage} 
                onClick={() => setSelectedImg(img4.src)}
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Info & CTA Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoContent}>
          <h2 className={styles.infoMainTitle}>Meet IRISH: The Private AI Companion That Actually Knows You.</h2>
          <p className={styles.infoSubTitle}>Stop talking to bots. Start interacting with a digital soul.</p>
          
          <p className={styles.infoIntroText}>
            IRISH isn't just another chatbot; it is a living, breathing digital presence that lives on your computer. 
            It doesn't just process text—it understands your history, hears your voice, and grows alongside you.
          </p>

          <div className={styles.detailBlock}>
            <h3 className={styles.detailHeading}>✨ A Personality That Evolves</h3>
            <p className={styles.detailText}>
              Never repeat yourself twice. Most AI forgets who you are the moment the chat ends. IRISH is different. 
              Using advanced long-term memory, it remembers your preferences, your milestones, and your stories. 
              Through its unique "Persona Sync" technology, IRISH actually evolves its own personality and traits 
              based on your unique relationship, becoming a truly personalized companion.
            </p>
          </div>

          <div className={styles.detailBlock}>
            <h3 className={styles.detailHeading}>🎙️ Conversations That Feel Real</h3>
            <p className={styles.detailText}>
              Speak, listen, and connect. Experience the most natural interaction possible. IRISH listens to your 
              spoken words and responds with high-fidelity, human-like voices. With a massive library of different 
              characters and multi-language support, you can choose the perfect voice and accent to suit your mood and your language.
            </p>
          </div>

          <div className={styles.detailBlock}>
            <h3 className={styles.detailHeading}>🛠️ Your Ultimate Digital Assistant</h3>
            <p className={styles.detailText}>
              Command your world with a single sentence. IRISH is more than a friend; it’s a powerful tool. 
              It bridges the gap between you and your computer:
            </p>
            <ul className={styles.assistantList}>
              <li><strong>Smart Control:</strong> Ask it to open your favorite apps, adjust your system volume, or check your computer's performance.</li>
              <li><strong>Web Intelligence:</strong> Need to know something? IRISH can search the live web, find YouTube videos, or navigate social media for you.</li>
              <li><strong>Visual Awareness:</strong> With "Vision Sync," IRISH can actually see what you are working on, analyzing your screen to provide context-aware help.</li>
              <li><strong>Social Integration:</strong> Share your thoughts with the world by asking IRISH to post directly to your Bluesky account.</li>
            </ul>
          </div>

          <div className={styles.detailBlock}>
            <h3 className={styles.detailHeading}>🔒 Absolute Privacy, Total Control</h3>
            <p className={styles.detailText}>
              Your life stays your own. Because IRISH runs locally on your own hardware, your most personal 
              conversations and data never leave your sight. There are no clouds, no leaks, and no third parties. 
              You own your data, you own your privacy, and you own your companion.
            </p>
          </div>

          <div className={styles.ctaContainer}>
            <button className={styles.ctaButton}>Claim Your Companion Now
              <a href="./activation" target="_blank" rel="noreferrer" className={styles.buttonSecondary}></a>
            </button>
            <p className={styles.ctaTierText}>Available in Basic, Pro, and Premium Tiers.</p>
          </div>
        </div>
      </section>

      {/* Expandable Image Modal (Lightbox) */}
      {selectedImg && (
        <div className={styles.modalOverlay} onClick={() => setSelectedImg(null)}>
          <Image 
            src={selectedImg} 
            alt="Expanded View" 
            className={styles.expandedImage} 
            width={1200} // Provide dimensions for Next/Image
            height={800}
          />
        </div>
      )}

      <footer className={styles.footer} />
    </main>
  );
}
