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
  
  // NEW: State for dynamic pricing
  const [prices, setPrices] = useState<any[]>([]);
  const [fetchingPrices, setFetchingPrices] = useState(true);

  const GOOGLE_DRIVE_LINK = "https://drive.google.com/drive/folders/1lBXZpuHhCtDeF-z9x50UrLJ7m1Zbkkwi?usp=sharing";

  // Fetch prices from Supabase on load
  useEffect(() => {
    const fetchPrices = async () => {
      const { data, error } = await supabase.from('pricing_config').select('*');
      if (data) setPrices(data);
      setFetchingPrices(false);
    };
    fetchPrices();
  }, []);

  // Find price from the fetched array
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
  <section className="text-center mb-20">
    <h1 className="text-5xl font-bold mb-4">Assistant AI</h1>
    <p className="text-gray-400 mb-6">Get the latest assets and models.</p>
    <a href={GOOGLE_DRIVE_LINK} className={styles.buttonPrimary}>
      Download Folder Now
    </a>
  </section>

  <section className={`${styles.card} max-w-md mx-auto`}>
    <h2 className="text-2xl font-bold mb-6 text-center">Upgrade to Pro / Premium</h2>
    
    <div className="space-y-4">
      <input 
        type="email" 
        placeholder="Enter your email" 
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select className={styles.select} value={tier} onChange={(e) => setTier(e.target.value)}>
        <option value="pro">Pro Tier</option>
        <option value="premium">Premium Tier</option>
      </select>

      <select className={styles.select} value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
        <option value={1}>1 Month</option>
        <option value={3}>3 Months</option>
        <option value={12}>1 Year</option>
      </select>

      <div className="text-center py-2 text-xl font-semibold">
        {fetchingPrices ? "Loading price..." : `Estimated Cost: $${getCost(tier, duration)}`}
      </div>

      <button onClick={handleUpgrade} disabled={loading} className={styles.buttonPrimary}>
        {loading ? "Generating..." : "Get My Key"}
      </button>
    </div>

    {/* Success Modal */}
    {generatedKey && (
      <div className={styles.modalOverlay}>
        <div className={`${styles.card} max-w-sm w-full text-center border-blue-500`}>
          <h3 className="text-2xl font-bold mb-2 text-blue-400">Activation Success!</h3>
          <div className="bg-black p-4 rounded font-mono text-lg mb-6 border border-gray-600 select-all">
            {generatedKey}
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={downloadKeyFile} className={styles.buttonSuccess}>Download .txt File</button>
            <button onClick={() => setGeneratedKey(null)} className="text-gray-400 text-sm underline">Close</button>
          </div>
        </div>
      </div>
    )}
  </section>
</div>
  );
}
