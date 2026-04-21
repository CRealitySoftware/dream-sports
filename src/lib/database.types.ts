export type UserRole = "admin" | "client";
export type UserStatus = "pending" | "approved" | "rejected" | "completed";
export type Discipline = "football" | "basketball" | "volleyball" /* | "cycling" */;

export type UserRow = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  email: string;
  phone: string | null;
  discipline: Discipline;
  father_name: string;
  father_cedula: string;
  mother_name: string;
  mother_cedula: string;
  message: string | null;
  parent_consent: boolean;
  data_consent: boolean;
  publication_consent: boolean;
  password: string | null;
  role: UserRole;
  status: UserStatus;
  invoice_id: string | null;
  invoice_path: string | null;
  is_paid: boolean;
};

export type UserInsert = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  discipline: Discipline;
  father_name: string;
  father_cedula: string;
  mother_name: string;
  mother_cedula: string;
  message?: string | null;
  parent_consent: boolean;
  data_consent: boolean;
  publication_consent: boolean;
  password?: string | null;
  role?: UserRole;
  status?: UserStatus;
  invoice_id?: string | null;
  invoice_path?: string | null;
  is_paid?: boolean;
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: UserInsert;
        Update: Partial<UserInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      user_status: UserStatus;
      discipline: Discipline;
    };
    CompositeTypes: Record<string, never>;
  };
};
