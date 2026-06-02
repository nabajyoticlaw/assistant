"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldAlert, Trash2, RefreshCw, CheckCircle2, XCircle, 
  ArrowUpCircle, User, DollarSign, Settings, Save
} from 'lucide-react';
import styles from '../../admin.module.css'; // Path relative to app/admin/page.tsx

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'pricing'>('users');
  const [draftPrices, setDraftPrices] = useState<Record<string, number>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // We send the password to the Edge Function to check it
    const { data, error } = await supabase.functions.invoke('admin-gatekeeper', {
      body: { password: password, action: 'verify_login' }
    });
  
    if (error || data?.error) {
      alert('Invalid Password');
    } else {
      setIsAdmin(true);
    }
  };
  

  const fetchData = async () => {
    setLoading(true);
    const { data: subs } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false });
    const { data: prices } = await supabase.from('pricing_config').select('*');
    setSubscriptions(subs || []);
    setPricing(prices || []);
    setLoading(false);
    setDraftPrices({});
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'revoked' : 'active';
    setIsUpdating(id);
  
    // We ask the Gatekeeper (Edge Function) to do the work for us
    const { error } = await supabase.functions.invoke('admin-gatekeeper', {
      body: { 
        password: password, // The password you entered at login
        action: 'toggle_status', 
        payload: { id, newStatus } 
      }
    });
  
    if (error) alert("Unauthorized or Error"); 
    else fetchData();
    setIsUpdating(null);
  };
  

  const toggleTier = async (id: string, currentTier: string) => {
    const newTier = currentTier === 'pro' ? 'premium' : 'pro';
    setIsUpdating(id);
    const { error } = await supabase.functions.invoke('admin-gatekeeper', {
      body: { password: password, action: 'toggle_tier', payload: { id, newTier } }
    });
    if (error) alert("Unauthorized"); else fetchData();
    setIsUpdating(null);
  };

  const deleteSubscription = async (id: string) => {
    if (!confirm("Delete record?")) return;
    const { error } = await supabase.functions.invoke('admin-gatekeeper', {
      body: { password: password, action: 'delete_sub', payload: { id } }
    });
    if (error) alert("Unauthorized"); else fetchData();
  };

  const handleSaveAll = async () => {
    if (Object.keys(draftPrices).length === 0) return;
    setIsUpdating('pricing');
    
    // 1. Prepare the updates array exactly as you did before
    const updates = Object.entries(draftPrices).map(([id, newPrice]) => {
      const originalRow = pricing.find((p) => p.id === id);
      return {
        tier: originalRow.tier,
        duration: originalRow.duration,
        price: newPrice
      };
    });

  // 2. SECURE CHANGE: Send the password and the updates to the Edge Function
  const { error } = await supabase.functions.invoke('admin-gatekeeper', {
    body: { 
      password: password,           // The password you entered in the login box
      action: 'save_all_pricing',    // The specific action name
      payload: { updates }           // The array of new prices
    }
  });

  if (error) {
    alert("Save failed: " + error.message);
  } else {
    setDraftPrices({});
    fetchData();
  }
  setIsUpdating(null);
};

  if (!isAdmin) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginCard}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldAlert style={{ color: '#38bdf8', width: '48px', height: '48px' }} />
            </div>
            <h1 className={styles.loginTitle}>Admin Control Panel</h1>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="password" 
                className={styles.loginInput} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="submit" className={styles.loginButton}>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dashboardContainer}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>
            {activeTab === 'users' ? <User color="#38bdf8" /> : <DollarSign color="#22c55e" />} 
            {activeTab === 'users' ? 'License Management' : 'Pricing Control'}
          </h1>
          <div className={styles.tabGroup}>
            <button 
              onClick={() => setActiveTab('users')} 
              className={`${styles.tabButton} ${activeTab === 'users' ? styles.tabButtonActive : ''}`}
            >
              Users
            </button>
            <button 
              onClick={() => setActiveTab('pricing')} 
              className={`${styles.tabButton} ${activeTab === 'pricing' ? styles.tabButtonActive : ''}`}
              style={{ '--active-color': '#22c55e' } as any} // Custom color logic if needed
            >
              Pricing
            </button>
            <button onClick={fetchData} className={styles.refreshButton}>
              <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
            </button>
          </div>
        </div>

        {/* TAB 1: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className={styles.tableCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableTh}>User Email</th>
                    <th className={styles.tableTh}>Key</th>
                    <th className={styles.tableTh}>Tier</th>
                    <th className={styles.tableTh}>Status</th>
                    <th className={styles.tableTh} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className={styles.rowHover}>
                      <td className={styles.tableTd}>{sub.email}</td>
                      <td className={styles.tableTd} style={{ fontFamily: 'monospace', color: '#60a5fa', fontSize: '0.875rem' }}>{sub.license_key}</td>
                      <td className={styles.tableTd}>
                        <span className={`${styles.tierBadge} ${sub.tier === 'premium' ? styles.tierPremium : styles.tierPro}`}>
                          {sub.tier.toUpperCase()}
                        </span>
                      </td>
                      <td className={styles.tableTd}>
                        {sub.status === 'active' ? (
                          <span className={styles.statusActive}><CheckCircle2 size={14}/> Active</span>
                        ) : (
                          <span className={styles.statusRevoked}><XCircle size={14}/> {sub.status}</span>
                        )}
                      </td>
                      <td className={styles.tableTd}>
                        <div className={styles.actionButtons}>
                          <button onClick={() => toggleTier(sub.id, sub.tier)} className={styles.iconBtn} title="Change Tier">
                            <ArrowUpCircle size={18}/>
                          </button>
                          <button onClick={() => toggleStatus(sub.id, sub.status)} className={styles.iconBtn} title="Toggle Status">
                            <XCircle size={18}/>
                          </button>
                          <button onClick={() => deleteSubscription(sub.id)} className={`${styles.iconBtn} ${styles.iconBtnRed}`} title="Delete">
                            <Trash2 size={18}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRICING MANAGEMENT */}
        {activeTab === 'pricing' && (
          <div className={styles.dashboardContainer}>
            <div className={styles.tableCard} style={{ padding: '2rem' }}>
              <h3 className={styles.title} style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                <Settings size={20} /> Edit Product Prices
              </h3>
              
              <div className={styles.pricingGrid}>
                {pricing.map((p) => (
                  <div key={p.id} className={styles.priceCard}>
                    <div className={styles.priceCardHeader}>
                      <span className={styles.priceCardTier}>{p.tier}</span>
                      <span className={styles.priceCardDuration}>{p.duration} Month(s)</span>
                    </div>
                    
                    <div className={styles.priceInputWrapper}>
                      <span style={{ fontSize: '1.5rem' }}>$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        className={styles.priceInput}
                        value={draftPrices[p.id] !== undefined ? draftPrices[p.id] : p.price}
                        onChange={(e) => setDraftPrices({ ...draftPrices, [p.id]: parseFloat(e.target.value) })}
                      />
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '1rem', textTransform: 'uppercase' }}>
                      Pending change
                    </p>
                  </div>
                ))}
              </div>

              <div className={styles.saveSection}>
                <button 
                  onClick={handleSaveAll}
                  disabled={Object.keys(draftPrices).length === 0 || isUpdating === 'pricing'}
                  className={styles.saveButton}
                >
                  {isUpdating === 'pricing' ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                  {isUpdating === 'pricing' ? 'Saving...' : 'Save All Changes'}
                </button>
                <p className={styles.statusText}>
                  {Object.keys(draftPrices).length > 0 
                    ? `You have ${Object.keys(draftPrices).length} pending change(s)` 
                    : 'No changes pending'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
