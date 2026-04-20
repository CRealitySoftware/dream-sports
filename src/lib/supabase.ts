import { createClient } from "@supabase/supabase-js";
import type { Database, UserInsert } from "./database.types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const insertUser = (data: UserInsert) => {
  return supabase.from("users").insert(data as never);
}
