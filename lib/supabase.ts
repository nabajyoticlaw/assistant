import { createClient } from '@supabase/supabase-js';

// We use quotes '' around the values so the computer treats them as text.
// This prevents the "Syntax Error" you were seeing.
const supabaseUrl = 'https://niotxmtaobihmvomgnfz.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb3R4bXRhb2JpaG12b21nbmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzE3NjIsImV4cCI6MjA5NTkwNzc2Mn0.dSXE-HE64h7Z-IWHzcIhSqe272zUD9-WjE9bwqxv6uc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
