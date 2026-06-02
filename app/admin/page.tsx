"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldAlert, Trash2, RefreshCw, CheckCircle2, XCircle, 
  ArrowUpCircle, ArrowDownCircle, Key, User, DollarSign, Settings, Check, Save
} from 'lucide-react';

const supabase = createClient(
  'https://niotxmtaobihmvomgnfz.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb3R4bXRhb2JpaG12b21nbmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE3NjIsImV4cCI6MjA5NTkwNzc2Mn0.dSXE-HE64h7Z-IWHzcIhSqe272zUD9-WjE9bwqxv6uc'
);

export default function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'pricing'>('users');

  // --- NEW: DRAFT STATE ---
  // This tracks changes locally so they don't "revert" while typing
  const [draftPrices, setDraftPrices] = useState<Record<string, number>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAdmin(true);
    else alert('Invalid Admin Password');
  };

  const fetchData = async () => {
    setLoading(true);
    const { data: subs } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false });
    const { data: prices } = await supabase.from('pricing_config').select('*');
    setSubscriptions(subs || []);
    setPricing(prices || []);
    setLoading(false);
    setDraftPrices({}); // Reset drafts on refresh
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  // --- Subscription Actions ---
  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'revoked' : 'active';
    setIsUpdating(id);
    const { error } = await supabase.from('subscriptions').update({ status: newStatus }).eq('id', id);
    if (error) alert(error.message); else fetchData();
    setIsUpdating(null);
  };

  const toggleTier = async (id: string, currentTier: string) => {
    const newTier = currentTier === 'pro' ? 'premium' : 'pro';
    setIsUpdating(id);
    const { error } = await supabase.from('subscriptions').update({ tier: newTier }).eq('id', id);
    if (error) alert(error.message); else fetchData();
    setIsUpdating(null);
  };

  const deleteSubscription = async (id: string) => {
    if (!confirm("Delete record?")) return;
    const { error } = await supabase.from('subscriptions').delete().eq('id', id);
    if (error) alert(error.message); else fetchData();
  };

  // --- NEW: BULK SAVE LOGIC ---
  const handleSaveAll = async () => {
    if (Object.keys(draftPrices).length === 0) return;

    setIsUpdating('pricing');
    
    // Convert the draft object into an array of database-ready rows
    const updates = Object.entries(draftPrices).map(([id, newPrice]) => {
      const originalRow = pricing.find((p) => p.id === id);
      return {
        tier: originalRow.tier,
        duration: originalRow.duration,
        price: newPrice
      };
    });

    // Perform a single bulk upsert
    const { error } = await supabase
      .from('pricing_config')
      .upsert(updates, { onConflict: 'tier, duration' });

    if (error) {
      alert("Save failed: " + error.message);
    } else {
      setDraftPrices({}); // Clear drafts after successful save
      fetchData(); // Refresh to sync with DB
    }
    setIsUpdating(null);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6"><ShieldAlert className="text-blue-500 w-12 h-12" /></div >
          <h1 className="text-2xl font-bold text-center mb-2">Admin Control Panel</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" className="w-full p-3 bg-black border border-gray-700 rounded-lg outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full bg-blue-600 p-3 rounded-lg font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            {activeTab === 'users' ? <User className="text-blue-500" /> : <DollarSign className="text-green-500" />} 
            {activeTab === 'users' ? 'License Management' : 'Pricing Control'}
          </h1>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-600' : 'bg-gray-800'}`}>Users</button>
            <button onClick={() => setActiveTab('pricing')} className={`px-4 py-2 rounded-lg ${activeTab === 'pricing' ? 'bg-green-600' : 'bg-gray-800'}`}>Pricing</button>
            <button onClick={fetchData} className="p-2 bg-gray-900 rounded-lg border border-gray-800"><RefreshCw className={loading ? "animate-spin" : ""} size={20} /></button>
          </div>
        </div>

        {/* TAB 1: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                  <tr><th className="p-4">User Email</th><th className="p-4">Key</th><th className="p-4">Tier</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4">{sub.email}</td>
                      <td className="p-4 font-mono text-blue-400 text-sm">{sub.license_key}</td>
                      <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded ${sub.tier === 'premium' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>{sub.tier.toUpperCase()}</span></td>
                      <td className="p-4">{sub.status === 'active' ? <span className="text-green-400 flex items-center gap-1 text-sm"><CheckCircle2 size={14}/> Active</span> : <span className="text-red-400 flex items-center gap-1 text-sm"><XCircle size={14}/> {sub.status}</span>}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => toggleTier(sub.id, sub.tier)} className="text-gray-400 hover:text-blue-400"><ArrowUpCircle size={18}/></button>
                          <button onClick={() => toggleStatus(sub.id, sub.status)} className="text-gray-400 hover:text-orange-400"><XCircle size={18}/></button>
                          <button onClick={() => deleteSubscription(sub.id)} className="text-red-500"><Trash2 size={18}/></button>
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
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings size={20}/> Edit Product Prices</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricing.map((p) => (
                  <div key={p.id} className="bg-black p-5 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold uppercase text-blue-400">{p.tier}</span>
                      <span className="text-gray-500 text-sm">{p.duration} Month(s)</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xl">$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        className="bg-transparent text-2xl font-bold outline-none w-full"
                        // Use draft value if exists, otherwise use DB value
                        value={draftPrices[p.id] !== undefined ? draftPrices[p.id] : p.price}
                        onChange={(e) => setDraftPrices({ ...draftPrices, [p.id]: parseFloat(e.target.value) })}
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-tight">Changes are temporary until you save</p>
                  </div>
                ))}
              </div>

              {/* THE SAVE ALL BUTTON */}
              <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col items-center">
                <button 
                  onClick={handleSaveAll}
                  disabled={Object.keys(draftPrices).length === 0 || isUpdating === 'pricing'}
                  className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold transition-all ${
                    Object.keys(draftPrices).length === 0 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                  }`}
                >
                  {isUpdating === 'pricing' ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
                  {isUpdating === 'pricing' ? 'Saving...' : 'Save All Changes'}
                </button>
                <p className="text-gray-500 text-sm mt-3">
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
