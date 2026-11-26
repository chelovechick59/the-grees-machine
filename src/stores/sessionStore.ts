import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { SavedSession } from '../types'

export const useSessionStore = defineStore('sessions', () => {
  function loadSessions(): SavedSession[] {
    try {
      return JSON.parse(
        localStorage.getItem('greed-sessions') || '[]'
      )
    } catch {
      return []
    }
  }

  const sessions = ref<SavedSession[]>(loadSessions())

  const activeSessionId = ref(
    localStorage.getItem('greed-active-session') || ''
  )

  function selectSession(id: string) {
    activeSessionId.value = id
  }

  function saveSession(session: SavedSession) {
    const existing = sessions.value.find(
      item => item.id === session.id
    )

    if (existing) {
      existing.name = session.name
      existing.character = session.character
    } else {
      sessions.value.push(session)
    }
  }

  function removeSession(id: string) {
    sessions.value = sessions.value.filter(
      session => session.id !== id
    )

    if (activeSessionId.value === id) {
      activeSessionId.value = ''
    }
  }

  watch(sessions, value => {
    localStorage.setItem(
      'greed-sessions',
      JSON.stringify(value)
    )
  }, { deep: true })

  watch(activeSessionId, value => {
    localStorage.setItem(
      'greed-active-session',
      value
    )
  })

  return {
    sessions,
    activeSessionId,
    selectSession,
    saveSession,
    removeSession
  }
})