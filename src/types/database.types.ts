export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          brand_personality: Json | null
          creation_date: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          brand_personality?: Json | null
          creation_date?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          description?: string | null
          brand_personality?: Json | null
          creation_date?: string
        }
      }
      brand_elements: {
        Row: {
          id: string
          brand_id: string
          element_type: string
          element_data: Json | null
          ai_suggestions: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          element_type: string
          element_data?: Json | null
          ai_suggestions?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          element_type?: string
          element_data?: Json | null
          ai_suggestions?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          brand_id: string
          name: string
          description: string | null
          status: string | null
          current_phase: string
          discovery_complete: boolean
          definition_complete: boolean
          design_complete: boolean
          development_complete: boolean
          ai_suggestions: Json | null
          start_date: string | null
          due_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          name: string
          description?: string | null
          status?: string | null
          current_phase?: string
          discovery_complete?: boolean
          definition_complete?: boolean
          design_complete?: boolean
          development_complete?: boolean
          ai_suggestions?: Json | null
          start_date?: string | null
          due_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          name?: string
          description?: string | null
          status?: string | null
          current_phase?: string
          discovery_complete?: boolean
          definition_complete?: boolean
          design_complete?: boolean
          development_complete?: boolean
          ai_suggestions?: Json | null
          start_date?: string | null
          due_date?: string | null
          created_at?: string
        }
      }
      project_phases: {
        Row: {
          id: string
          project_id: string
          phase_type: string
          start_date: string | null
          completion_date: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          phase_type: string
          start_date?: string | null
          completion_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          phase_type?: string
          start_date?: string | null
          completion_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_artifacts: {
        Row: {
          id: string
          project_id: string
          phase: string
          artifact_type: string
          content: Json | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          phase: string
          artifact_type: string
          content?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          phase?: string
          artifact_type?: string
          content?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          project_id: string
          asset_type: string
          file_url: string | null
          content: Json | null
          metadata: Json | null
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          asset_type: string
          file_url?: string | null
          content?: Json | null
          metadata?: Json | null
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          asset_type?: string
          file_url?: string | null
          content?: Json | null
          metadata?: Json | null
          version?: number
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          brand_id: string
          user_id: string | null
          messages: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          user_id?: string | null
          messages?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          user_id?: string | null
          messages?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_memory: {
        Row: {
          id: string
          brand_id: string
          memory_type: string | null
          content: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          memory_type?: string | null
          content?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          memory_type?: string | null
          content?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          organization_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          organization_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          organization_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 