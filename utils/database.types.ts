export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          documento_identidad: number | null;
          genero: string | null;
          fecha_nacimiento: Date | null;
          telefono: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username: string | null;
          full_name: string | null;
          documento_identidad: number | null;
          genero: string | null;
          fecha_nacimiento: Date | null;
          telefono: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username: string | null;
          full_name: string | null;
          documento_identidad: number | null;
          genero: string | null;
          fecha_nacimiento: Date | null;
          telefono: string | null;
          avatar_url: string | null;
          website: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
