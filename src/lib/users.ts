import { supabase } from "./supabase";
import type { UserRow, UserStatus } from "./database.types";

export type { UserRow, UserStatus };

export const DISCIPLINE_LABELS: Record<string, string> = {
  football: "Fútbol",
  basketball: "Baloncesto",
  volleyball: "Voleibol",
  cycling: "Ciclismo",
};

export type StatusConfig = {
  label: string;
  color: string;
  bg: string;
};

export const STATUS_CONFIG: Record<UserStatus, StatusConfig> = {
  pending:   { label: "Pendiente",  color: "rgba(201,162,39,1)",  bg: "rgba(201,162,39,0.12)"  },
  approved:  { label: "Aprobado",   color: "rgba(30,160,70,1)",   bg: "rgba(40,180,90,0.12)"   },
  rejected:  { label: "Rechazado",  color: "rgba(220,60,60,1)",   bg: "rgba(220,60,60,0.12)"   },
  completed: { label: "Completado", color: "rgba(8,61,145,1)",    bg: "rgba(8,61,145,0.12)"    },
};

export type EditableUserFields = Pick<
  UserRow,
  | "name"
  | "email"
  | "phone"
  | "discipline"
  | "father_name"
  | "father_cedula"
  | "mother_name"
  | "mother_cedula"
  | "message"
>;

export async function fetchUsers(): Promise<UserRow[]> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("role", "client")
    .order("created_at", { ascending: false }) as unknown as {
      data: UserRow[] | null;
    };
  return data ?? [];
}

export async function updateUserInfo(id: string, fields: Partial<EditableUserFields>) {
  const { error } = await supabase
    .from("users")
    .update(fields as never)
    .eq("id", id);
  return { error };
}

export async function updateUserStatus(id: string, status: UserStatus, isPaid?: boolean) {
  const payload: Record<string, unknown> = { status };
  if (isPaid !== undefined) payload.is_paid = isPaid;
  const { error } = await supabase
    .from("users")
    .update(payload as never)
    .eq("id", id);
  return { error };
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id);
  return { error };
}

export async function getDocumentSignedUrl(path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from("invoices")
    .createSignedUrl(path, 3600);
  if (error || !data) return null;
  return data.signedUrl;
}
