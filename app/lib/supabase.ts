import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxrbhguwygosqgwfbcoq.supabase.co";

const supabaseAnonKey =
  "sb_publishable_FJhmps_43Bx-G2I4rPzA4w_yw8fZwCu";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);