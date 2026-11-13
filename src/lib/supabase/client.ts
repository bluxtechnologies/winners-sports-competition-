import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Accept both legacy JWT anon keys (eyJ...) and newer publishable keys (sb_publishable_...)
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

const isValidKey = (key: string) =>
  key.startsWith("eyJ") || key.startsWith("sb_publishable_");

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project") &&
  isValidKey(supabaseAnonKey)
);

let _supabase: ReturnType<typeof createClient> | null = null;

if (isSupabaseConfigured) {
  try {
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  } catch (err) {
    console.error("[WSC] Supabase client initialization failed:", err);
    _supabase = null;
  }
}

export const supabase = _supabase;
