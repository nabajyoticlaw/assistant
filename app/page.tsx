"use client";
import styles from '../user.module.css';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://niotxmtaobihmvomgnfz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb3R4bXRhb2JpaG12b21nbmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE3NjIsImV4cCI6MjA5NTkwNzc2Mn0.dSXE-HE64h7Z-IWHzcIhSqe272zUD9-WjE9bwqxv6uc');

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState("pro");
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [keyData, setKeyData] = useState<any>(null);
  
  const [prices, setPrices] = useState<any[]>([]);
  const [fetchingPrices, setFetchingPrices] = useState(true);

  const GOOGLE_DRIVE_LINK = "https://drive.google.com/drive/folders/1lBXZpuHhCtDeF-z9x50UrLJ7m1Zbkkwi?usp=sharing";

  useEffect(() => {
    const fetchPrices = async () => {
      const { data, error } = await supabase.from('pricing_config').select('*');
      if (data) setPrices(data);
      setFetchingPrices(false);
    };
    fetchPrices();
  }, []);

  const getCost = (t: string, d: number) => {
    const match = prices.find((p) => p.tier === t && p.duration === d);
    return match ? match.price.toFixed(2) : "0.00";
  };

  const handleUpgrade = async () => {
    if (!email.includes('@')) return alert("Please enter a valid email");
    setLoading(true);

    const cost = getCost(tier, duration);
    const newKey = `KEY-${Math.random().toString(36).substring(2, 15).toUpperCase()}-${tier.toUpperCase()}`;
    
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + duration);

    const { error } = await supabase.from('subscriptions').insert([
      {
        email: email,
        license_key: newKey,
        tier: tier,
        duration_months: duration,
        cost: parseFloat(cost),
        expires_at: expiryDate.toISOString(),
        status: 'active'
      }
    ]);

    if (error) {
      console.error(error);
      alert("Error generating key.");
    } else {
      setGeneratedKey(newKey);
      setKeyData({ email, tier, duration, cost: getCost(tier, duration), expiry: expiryDate.toLocaleDateString() });
    }
    setLoading(false);
  };

  const downloadKeyFile = () => {
    const content = `ACTIVATION INFORMATION\n----------------------\nEmail: ${keyData.email}\nKey: ${generatedKey}\nTier: ${keyData.tier}\nDuration: ${keyData.duration} Month(s)\nCost: $${keyData.cost}\nExpires: ${keyData.expiry}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activation_${generatedKey}.txt`;
    link.click();
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>PALKIN</h1>
        <p className={styles.heroSubtitle}>Your Truely Private Companion.</p>
        <div className={styles.heroButtonContainer}>
          <a href={GOOGLE_DRIVE_LINK} target="_blank" rel="noreferrer" className={styles.buttonSecondary}>
            Download Application
          </a>
        </div>
      </header>

      {/* Main Form Card */}
      <main className={styles.card}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
          Subscription Plans
        </h2>
        
        <div className={styles.formGroup}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select className={styles.select} value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="pro">Pro Tier Access</option>
            <option value="premium">Premium Tier Access</option>
          </select>

          <select className={styles.select} value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
            <option value={1}>1 Month Subscription</option>
            <option value={3}>3 Month Subscription</option>
            <option value={12}>12 Month Subscription</option>
          </select>

          <div className={styles.priceDisplay}>
            {fetchingPrices ? "Calculating..." : `$${getCost(tier, duration)}`}
          </div>

          <button 
            onClick={handleUpgrade} 
            disabled={loading} 
            className={styles.buttonPrimary}
          >
            {loading ? "Processing..." : "Generate License Key"}
          </button>
        </div>
      </main>

      {/* Success Modal */}
      {generatedKey && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.card} ${styles.modalContent}`}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38bdf8', textAlign: 'center' }}>
              Activation Successful
            </h3>
            <div className={styles.keyDisplay}>
              {generatedKey}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={downloadKeyFile} className={styles.buttonDownload}>
                Download License File
              </button>
              <button 
                onClick={() => setGeneratedKey(null)} 
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
