import { createClient } from "@supabase/supabase-js";

console.log("URL:", process.env.SUPABASE_URL);
console.log("SERVICE ROLE KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false },
  }
);
