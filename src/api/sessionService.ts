import http from './http'

import type {
  Character,
  GameState,
  SessionValidation
} from '../types'

export const sessionService = {
  async getCharacters() {
    const response = await http.get<Character[]>(
      '/characters'
    )

    return response.data
  },

  async createSession(
    characterId: string,
    name: string
  ) {
    const response = await http.post<GameState>(
      '/session/new',
      {
        character_id: characterId,
        custom_name: name
      }
    )

    return response.data
  },

  async verifySession(id: string) {
    const response = await http.get<SessionValidation>(
      '/session/' + encodeURIComponent(id) + '/verify'
    )

    return response.data
  },

  async getState() {
    const response = await http.get<GameState>(
      '/state'
    )

    return response.data
  },

  async selectCharacter(characterId: string) {
    const response = await http.post<GameState>(
      '/select-character',
      null,
      {
        params: {
          character_id: characterId
        }
      }
    )

    return response.data
  },

  async reset() {
    const response = await http.post<GameState>(
      '/reset',
      {
        reset_machine: false
      }
    )

    return response.data
  }
}