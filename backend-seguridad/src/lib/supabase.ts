// src/lib/supabase.ts
import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan variables de entorno para Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseKey);