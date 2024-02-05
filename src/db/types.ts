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
      mc_paper: {
        Row: {
          id: number
          is_hkdse: boolean
        }
        Insert: {
          id?: number
          is_hkdse: boolean
        }
        Update: {
          id?: number
          is_hkdse?: boolean
        }
        Relationships: []
      }
      mc_questions: {
        Row: {
          ans: Database["public"]["Enums"]["mc_answers"] | null
          hk_percent: number | null
          id: number
          q_num: number | null
          t_id: number | null
          year: number | null
        }
        Insert: {
          ans?: Database["public"]["Enums"]["mc_answers"] | null
          hk_percent?: number | null
          id: number
          q_num?: number | null
          t_id?: number | null
          year?: number | null
        }
        Update: {
          ans?: Database["public"]["Enums"]["mc_answers"] | null
          hk_percent?: number | null
          id?: number
          q_num?: number | null
          t_id?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "mc_student_response_correct"
            referencedColumns: ["t_id"]
          },
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "mc_student_topic_avarage"
            referencedColumns: ["t_id"]
          },
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "mc_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "topic_average"
            referencedColumns: ["t_id2"]
          },
          {
            foreignKeyName: "mc_questions_year_fkey"
            columns: ["year"]
            isOneToOne: false
            referencedRelation: "mc_paper"
            referencedColumns: ["id"]
          }
        ]
      }
      mc_six_s_responses: {
        Row: {
          class_num: number
          id: number
          q_id: number
          response: Database["public"]["Enums"]["mc_answers"]
          test_id: number | null
        }
        Insert: {
          class_num: number
          id?: number
          q_id: number
          response: Database["public"]["Enums"]["mc_answers"]
          test_id?: number | null
        }
        Update: {
          class_num?: number
          id?: number
          q_id?: number
          response?: Database["public"]["Enums"]["mc_answers"]
          test_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mc_six_s_responses_class_num_fkey"
            columns: ["class_num"]
            isOneToOne: false
            referencedRelation: "mc_six_s_students"
            referencedColumns: ["class_num"]
          },
          {
            foreignKeyName: "mc_six_s_responses_class_num_fkey"
            columns: ["class_num"]
            isOneToOne: false
            referencedRelation: "mc_student_topic_avarage"
            referencedColumns: ["class_num"]
          },
          {
            foreignKeyName: "mc_six_s_responses_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mc_tests"
            referencedColumns: ["id"]
          }
        ]
      }
      mc_six_s_students: {
        Row: {
          class_num: number
          name_c: string
          name_e: string
        }
        Insert: {
          class_num: number
          name_c: string
          name_e: string
        }
        Update: {
          class_num?: number
          name_c?: string
          name_e?: string
        }
        Relationships: []
      }
      mc_tests: {
        Row: {
          assigned_on: string
          id: number
          year: number
        }
        Insert: {
          assigned_on: string
          id?: number
          year: number
        }
        Update: {
          assigned_on?: string
          id?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "mc_tests_year_fkey"
            columns: ["year"]
            isOneToOne: false
            referencedRelation: "mc_paper"
            referencedColumns: ["id"]
          }
        ]
      }
      mc_topics: {
        Row: {
          id: number
          is_junior: boolean
          mia_e2: number | null
          t_title: string
        }
        Insert: {
          id?: number
          is_junior: boolean
          mia_e2?: number | null
          t_title: string
        }
        Update: {
          id?: number
          is_junior?: boolean
          mia_e2?: number | null
          t_title?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          CHNAME: string | null
          CLASSCODE: string
          CLASSNO: number
          ENNAME: string
          REGNO: number
          STUID: number
        }
        Insert: {
          CHNAME?: string | null
          CLASSCODE: string
          CLASSNO: number
          ENNAME: string
          REGNO?: number
          STUID: number
        }
        Update: {
          CHNAME?: string | null
          CLASSCODE?: string
          CLASSNO?: number
          ENNAME?: string
          REGNO?: number
          STUID?: number
        }
        Relationships: []
      }
      subjects: {
        Row: {
          CH_ABBR: string | null
          CH_SNAME: string | null
          CODE_ID: string
          DISP_ORDER: number | null
          DSE_SUBJ_CODE: string | null
          EN_ABBR: string | null
          EN_DES: string | null
          EN_SNAME: string | null
          IS_NSS_ONLY: boolean
        }
        Insert: {
          CH_ABBR?: string | null
          CH_SNAME?: string | null
          CODE_ID: string
          DISP_ORDER?: number | null
          DSE_SUBJ_CODE?: string | null
          EN_ABBR?: string | null
          EN_DES?: string | null
          EN_SNAME?: string | null
          IS_NSS_ONLY?: boolean
        }
        Update: {
          CH_ABBR?: string | null
          CH_SNAME?: string | null
          CODE_ID?: string
          DISP_ORDER?: number | null
          DSE_SUBJ_CODE?: string | null
          EN_ABBR?: string | null
          EN_DES?: string | null
          EN_SNAME?: string | null
          IS_NSS_ONLY?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      mc_student_response_correct: {
        Row: {
          ans: Database["public"]["Enums"]["mc_answers"] | null
          class_num: number | null
          correct: boolean | null
          r_id: number | null
          response: Database["public"]["Enums"]["mc_answers"] | null
          t_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mc_six_s_responses_class_num_fkey"
            columns: ["class_num"]
            isOneToOne: false
            referencedRelation: "mc_six_s_students"
            referencedColumns: ["class_num"]
          },
          {
            foreignKeyName: "mc_six_s_responses_class_num_fkey"
            columns: ["class_num"]
            isOneToOne: false
            referencedRelation: "mc_student_topic_avarage"
            referencedColumns: ["class_num"]
          }
        ]
      }
      mc_student_topic_avarage: {
        Row: {
          class_num: number | null
          class_percent: number | null
          correct: number | null
          hk_average: number | null
          percentage: number | null
          t_id: number | null
          t_title: string | null
          total: number | null
        }
        Relationships: []
      }
      topic_average: {
        Row: {
          class_percent: number | null
          hk_average: number | null
          t_id: number | null
          t_id2: number | null
          t_title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "mc_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "mc_student_response_correct"
            referencedColumns: ["t_id"]
          },
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "mc_student_topic_avarage"
            referencedColumns: ["t_id"]
          },
          {
            foreignKeyName: "mc_questions_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "topic_average"
            referencedColumns: ["t_id2"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      mc_answers: "A" | "B" | "C" | "D" | "N"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
    Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
    Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database["public"]["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
