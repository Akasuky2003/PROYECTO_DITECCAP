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
          dni: string | null;
          genre: string | null;
          birthdate: Date | null;
          phone: string | null;
          avatar_url: string | null;
          location: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          dni?: string | null;
          genre?: string | null;
          birthdate?: Date | null;
          phone?: string | null;
          avatar_url?: string | null;
          location?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          dni?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          location?: string | null;
          birthdate?: Date | null;
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
