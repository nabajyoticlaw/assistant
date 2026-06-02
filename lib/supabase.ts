import { createClient } from '@supabase/supabase-js';

// These must be added to your Vercel Environment Variables
const supabaseUrl = process.env.https://niotxmtaobihmvomgnfz.supabase.co || '';
const supabaseAnonKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb3R4bXRhb2JpaG12b21nbmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE3NjIsImV4cCI6MjA5NTkwNzc2Mn0.dSXE-HE64h7Z-IWHzcIhSqe272zUD9-WjE9bwqxv6uc || '';

// This creates the connection used by your Admin page and your App
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
