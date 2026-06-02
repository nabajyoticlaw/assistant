'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils'; // Must have TWO dots (..)


import { 
  ShieldAlert,
  Plus,
  Trash2,
  Key,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro' | 'premium'>('pro');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  // 1. Simple Security Gate
  // Change 'admin123' to whatever you want your password to be!
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
    } else {
      alert('Invalid Admin Password');
    }
  };

  // 2. Fetch Keys from Supabase
  const fetchKeys = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('license_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching keys:', error);
    else setKeys(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchKeys();
  }, [isAdmin]);

  // 3. Generate New Key Logic with Expiration
  const generateKey = async () => {
    setGenerating(true);
    
    // 1. Create the random key
    const newKey = Array.from({ length: 4 }, () => 
      Math.random().toString(36).substring(2, 6).toUpperCase()
    ).join('-');

    // 2. CALCULATE EXPIRATION (Example: 30 days from now)
    // You can change '30' to any number of days you want
    const expirationDays = 30; 
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expirationDays);

    const { error } = await supabase
      .from('license_keys')
      .insert([
        { 
          key_string: newKey, 
          tier: selectedTier, 
          is_active: true,
          expires_at: expiryDate.toISOString() // <--- ADDED THIS
        }
      ]);

    if (error) {
      alert('Error generating key: ' + error.message);
    } else {
      await fetchKeys();
    }
    setGenerating(false);
  };

  // 4. Delete Key Logic
  const deleteKey = async (id: string) => {
    const { error } = await supabase.from('license_keys').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchKeys();
  };

  // --- UI: LOGIN VIEW ---
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#1e1e1e] p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <ShieldAlert className="text-[#BB86FC] w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-2">Admin Access</h1>
          <p className="text-gray-400 text-center mb-8">Enter credentials to manage licenses</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full p-3 bg-[#141414] border border-white/10 rounded-xl text-white focus:border-[#BB86FC] outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit"
              className="w-full py-3 bg-[#BB86FC] text-black font-bold rounded-xl hover:bg-[#00E5FF] transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- UI: DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#141414] text-gray-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Key className="text-[#00E5FF]" /> License Manager
            </h1>
            <p className="text-gray-500 mt-2">Manage and generate AI Companion activation keys</p>
          </div>
          <button 
            onClick={fetchKeys}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all"
          >
            <RefreshCw className={cn(loading ? "animate-spin" : "")} size={20} />
          </button>
        </div>

        {/* Action Bar: Generate New Key */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
          <div className="md:col-span-1">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Select Tier</label>
            <select 
              className="w-full p-3 bg-[#141414] rounded-xl border border-white/10 text-white outline-none"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as any)}
            >
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          
          <div className="md:col-span-3 flex items-end">
            <button 
              onClick={generateKey}
              disabled={generating}
              className={cn(
                "flex-grow py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                generating ? "bg-gray-600" : "bg-[#BB86FC] text-black hover:bg-[#00E5FF]"
              )}
            >
              {generating ? <RefreshCw className="animate-spin" /> : <Plus />}
              {generating ? "Generating..." : "Generate New License Key"}
            </button>
          </div>
        </div>

        {/* Table of Keys */}
        <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
                <th className="p-4">License Key</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => (
                <tr key={key.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-white">{key.key_string}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase",
                      key.tier === 'premium' ? "bg-purple-500/20 text-purple-400" : 
                      key.tier === 'pro' ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"
                    )}>
                      {key.tier}
                    </span>
                  </td>
                  <td className="p-4">
                    {key.is_active ? (
                      <span className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={14} /> Revoked
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(key.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => deleteKey(key.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {keys.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500">
              No license keys found. Generate your first one above.
            </div>
          )}
          {loading && (
            <div className="p-12 text-center text-[#BB86FC] animate-pulse">
              Loading Database...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
