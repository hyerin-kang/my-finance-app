import { createClient, type SupabaseClient } from "@supabase/supabase-js";
const supabaseUrl: string = "https://eoqqhhxsuivcclddrjwk.supabase.co";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
