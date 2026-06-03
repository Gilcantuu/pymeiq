// Supabase JS client singleton.
// Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from env.
// Trigger rebuild to apply env vars.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug logs (visible in browser console at runtime)
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.log("[supabaseClient] URL =", supabaseUrl || "(undefined)");
  // eslint-disable-next-line no-console
  console.log(
    "[supabaseClient] ANON KEY (first 16 chars) =",
    supabaseAnonKey ? supabaseAnonKey.slice(0, 16) + "..." : "(undefined)"
  );
}

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabaseClient] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Save and dashboard features will not work."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);