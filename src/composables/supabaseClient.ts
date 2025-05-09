import type { Database } from "@/types";
import { createClient } from "@supabase/supabase-js";

export function useSupabaseClient() {
  //Create a single supabase client for interacting with your database
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_CLIENT_API_KEY
  //const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY

  /**
   * This supabase client is a regular secure client
   */
  //const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)

  return { supabase };
}
