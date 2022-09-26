import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const checkLoggedIn = () => supabase.auth.session() !== null;

const userEmail = () => {
  const user = supabase.auth.user();
  return user ? user.email : null;
};

export { supabase, checkLoggedIn, userEmail };
