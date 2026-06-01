"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://niotxmtaobihmvomgnfz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb3R4bXRhb2JpaG12b21nbmZ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDMzMTc2MiwiZXhwIjoyMDk1OTA3NzYyfQ.XS9EZvOK9keFW8oDxmBO-2xXaoBHK1eTz7JUX4VASnk'); // Use Service Role for Admin

export default function AdminPanel() {
  const [subs, setSubs] = useState<any[]>([]);

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    const { data } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false });
    if (data) setSubs(data);
  };

  const revokeKey = async (id: string) => {
    await supabase.from('subscriptions').update({ status: 'revoked' }).eq('id', id);
    fetchSubs();
  };

  return (
    <div className="p-10 bg-gray-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - License Management</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th className="p-3">Email</th>
            <th className="p-3">Key</th>
            <th className="p-3">Tier</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s.id} className="border-b border-gray-800 hover:bg-gray-900">
              <td className="p-3">{s.email}</td>
              <td className="p-3 font-mono text-blue-400">{s.license_key}</td>
              <td className="p-3">{s.tier}</td>
              <td className="p-3">
                <span className={s.status === 'active' ? 'text-green-500' : 'text-red-500'}>
                  {s.status}
                </span>
              </td>
              <td className="p-3">
                {s.status === 'active' && (
                  <button 
                    onClick={() => revokeKey(s.id)}
                    className="bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
