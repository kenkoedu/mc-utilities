import { createClient } from '@supabase/supabase-js'
import { Database } from './types'
import { Tables } from './types'

const supabase = createClient<Database>('https://mgefymczjjtbgdibanik.supabase.co', import.meta.env.VITE_SUPABASE_ADMIN_KEY)
const getTopics = async (): Promise<Tables<'mc_topics'>[]> => {
  const { data } = await supabase.from("mc_topics").select().order("id")
  return data || []
}

const getStudents = async () => {
  const { data } = await supabase.from("mc_six_s_students").select()
  return data
}

const getQuestions = async (): Promise<Tables<'mc_questions'>[]> => {
  const { data } = await supabase.from("mc_questions").select()
  return data || []
}

export { supabase, getTopics, getStudents, getQuestions }