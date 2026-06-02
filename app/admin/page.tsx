"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldAlert, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Key,
  User
} from 'lucide-react';

// Using your exact credentials from the user page
const supabase = createClient(
  'https://niotxmtaobihmvomgnfz.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb3R4bXRhb2JpaG12b21nbmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE3NjIsImV4cCI6MjA5NTkwNzc2Mn0.dSXE-HE64h7Z-IWHzcIhSqe272zUD9-WjE9bwqxv6uc'
);

export default function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // Track which row is updating

  // 1. Simple Security Gate
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Change this password!
      setIsAdmin(true);
    } else {
      alert('Invalid Admin Password');
    }
  };

  // 2. Fetch Subscriptions
  const fetchSubscriptions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching:', error);
    } else {
      setSubscriptions(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchSubscriptions();
  }, [isAdmin]);

  // 3. Management Actions

  // Toggle Status (Active <-> Revoked)
  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'revoked' : 'active';
    setIsUpdating(id);
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) alert(error.message);
    else fetchSubscriptions();
    setIsUpdating(null);
  };

  // Change Tier (Pro <-> Premium)
  const toggleTier = async (id: string, currentTier: string) => {
    const newTier = currentTier === 'pro' ? 'premium' : 'pro';
    setIsUpdating(id);
    const { error } = await supabase
      .from('subscriptions')
      .update({ tier: newTier })
      .eq('id', id);

    if (error) alert(error.message);
    else fetchSubscriptions();
    setIsUpdating(null);
  };

  // Delete Subscription
  const deleteSubscription = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    
    const { error } = await supabase.from('subscriptions').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchSubscriptions();
  };

  // --- UI: LOGIN VIEW ---
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <ShieldAlert className="text-blue-500 w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Control Panel</h1>
          <p className="text-gray-500 text-center mb-8">Enter password to manage licenses</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- UI: DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Key className="text-blue-500" /> License Management
            </h1>
            <p className="text-gray-500 mt-1">Manage user subscriptions and tiers</p>
          </div>
          <button 
            onClick={fetchSubscriptions}
            className="p-2 bg-gray-900 rounded-lg border border-gray-800 hover:bg-gray-800 transition"
          >
            <RefreshCw className={loading ? "animate-spin" : ""} size={20} />
          </button>
        </div>

        {/* Main Table Container */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                  <th className="p-4">User Email</th>
                  <th className="p-4">License Key</th>
                  <th className="p-4">Tier</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Expires</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    {/* Email */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span>{sub.email}</span>
                      </div>
                    </td>

                    {/* Key */}
                    <td className="p-4 font-mono text-sm text-blue-400">
                      {sub.license_key}
                    </td>

                    {/* Tier */}
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${sub.tier === 'premium' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {sub.tier.toUpperCase()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {sub.status === 'active' ? (
                        <span className="flex items-center gap-2 text-green-400 text-sm">
                          <CheckCircle2 size={14} /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-red-400 text-sm">
                          <XCircle size={14} /> {sub.status}
                        </span>
                      )}
                    </td>

                    {/* Expiry */}
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(sub.expires_at).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        
                        {/* Toggle Tier Button */}
                        <button 
                          onClick={() => toggleTier(sub.id, sub.tier)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition"
                          title={sub.tier === 'pro' ? "Upgrade to Premium" : "Downgrade to Pro"}
                        >
                          {sub.tier === 'pro' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                        </button>

                        {/* Toggle Status Button */}
                        <button 
                          onClick={() => toggleStatus(sub.id, sub.status)}
                          className={`p-2 transition ${sub.status === 'active' ? 'text-orange-400 hover:text-orange-300' : 'text-green-400 hover:text-green-300'}`}
                          title={sub.status === 'active' ? "Revoke Key" : "Activate Key"}
                        >
                          {sub.status === 'active' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                        </button>

                        {/* Delete Button */}
                        <button 
                          onClick={() => deleteSubscription(sub.id)}
                          className="p-2 text-red-500 hover:text-red-400 transition"
                          title="Delete Record"
                        >
                          <Trash2 size={18} />
                        </button>

                        {isUpdating === sub.id && (
                          <span className="text-xs animate-pulse text-blue-500 ml-2">Saving...</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {subscriptions.length === 0 && !loading && (
            <div className="p-20 text-center text-gray-500">
              No subscriptions found in the database.
            </div>
          )}

          {loading && (
            <div className="p-20 text-center text-blue-500 animate-pulse">
              Loading database records...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
