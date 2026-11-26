import { defineStore } from 'pinia'
import { ref } from 'vue'
import { sessionService } from '../api/sessionService'
import { useSessionStore } from './sessionStore'
import { useToastStore } from './toastStore'

import type {
  Character,
  GameState
} from '../types'

export const useGameStore = defineStore('game', () => {
  const sessionStore = useSessionStore()
  const toastStore = useToastStore()

  const characters = ref<Character[]>([])
  const state = ref<GameState | null>(null)
  const loading = ref(false)

  async function loadCharacters() {
    try {
      characters.value =
        await sessionService.getCharacters()
    } catch {
      // Помилка вже оброблена інтерцептором
    }
  }

  function applyState(data: GameState) {
    state.value = data

    sessionStore.selectSession(data.session_id)

    sessionStore.saveSession({
      id: data.session_id,
      name: data.name || 'Сесія автомата',
      character: data.character.name
    })
  }

  async function createSession(
    characterId: string,
    name: string
  ) {
    if (loading.value) return

    loading.value = true

    try {
      const data = await sessionService.createSession(
        characterId,
        name
      )

      applyState(data)

      toastStore.add(
        'Нову сесію створено',
        'success'
      )
    } catch {
      // Помилка вже оброблена інтерцептором
    } finally {
      loading.value = false
    }
  }

  async function connectSession(id: string) {
    if (loading.value || !id.trim()) return

    loading.value = true

    const previousId = sessionStore.activeSessionId

    try {
      const result =
        await sessionService.verifySession(id.trim())

      if (!result.valid) {
        toastStore.add(
          'Невалідний ID сесії',
          'warning'
        )

        return
      }

      sessionStore.selectSession(result.session_id)

      const data = await sessionService.getState()

      applyState(data)

      toastStore.add(
        'Сесію відновлено',
        'success'
      )
    } catch {
      sessionStore.selectSession(previousId)
    } finally {
      loading.value = false
    }
  }

  async function selectCharacter(id: string) {
    if (loading.value || !state.value) return

    loading.value = true

    try {
      const data =
        await sessionService.selectCharacter(id)

      applyState(data)
    } catch {
      // Помилка вже оброблена інтерцептором
    } finally {
      loading.value = false
    }
  }

  async function reset() {
    if (loading.value || !state.value) return

    loading.value = true

    try {
      const data = await sessionService.reset()

      applyState(data)

      toastStore.add(
        'Сесію скинуто',
        'success'
      )
    } catch {
      // Помилка вже оброблена інтерцептором
    } finally {
      loading.value = false
    }
  }

  return {
    characters,
    state,
    loading,
    loadCharacters,
    createSession,
    connectSession,
    selectCharacter,
    reset
  }
})