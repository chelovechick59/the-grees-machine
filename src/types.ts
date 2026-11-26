export interface Character {
  id: string
  name: string
  avatar_url: string
  starting_coins: number
  starting_bombs: number
  luck: number
  jam_rate: number
  surprise_chance: number
  description: string
}

export interface SavedSession {
  id: string
  name: string
  character: string
}

export interface GameState {
  session_id: string
  name: string
  character: Character
  wallet: number
  coins_in_machine: number
  jam_chance: number
  is_jammed: boolean
  is_exploded: boolean
  bombs: number
  total_donations: number
}

export interface SessionValidation {
  valid: boolean
  session_id: string
  name: string
  character_id: string
  character_name: string
  coins_in_machine: number
  is_jammed: boolean
  created_at: number
}

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
}