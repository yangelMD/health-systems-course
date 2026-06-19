export type Lang = 'en' | 'he'

export interface Profile {
  id: string
  username: string
  role: 'student' | 'admin'
  created_at: string
}

export interface Answer {
  id: string
  user_id: string
  country: string
  category_id: number
  answer_text: string
  updated_at: string
}

export interface SelectedCountries {
  user_id: string
  countries: string[]
}
