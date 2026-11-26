<script setup lang="ts">
import { onMounted } from 'vue'

import { useGameStore } from './stores/gameStore'
import { useSessionStore } from './stores/sessionStore'

import CharacterSelector from './components/CharacterSelector.vue'
import SessionManager from './components/SessionManager.vue'
import MachineCounter from './components/MachineCounter.vue'
import ToastContainer from './components/ToastContainer.vue'

const gameStore = useGameStore()
const sessionStore = useSessionStore()

onMounted(async () => {
  await gameStore.loadCharacters()

  if (sessionStore.activeSessionId) {
    await gameStore.connectSession(
      sessionStore.activeSessionId
    )
  }
})
</script>

<template>
  <div
    data-theme="dark"
    class="min-h-screen bg-base-300"
  >
    <header class="navbar bg-base-100 shadow-lg px-6">
      <h1 class="text-2xl font-bold">
        The Greed Machine
      </h1>

      <div class="ml-auto">
        <span
          v-if="gameStore.loading"
          class="loading loading-spinner"
        ></span>
      </div>
    </header>

    <main
      class="grid grid-cols-1 lg:grid-cols-3
             gap-6 p-6 max-w-7xl mx-auto items-start"
    >
      <CharacterSelector />

      <section class="card bg-base-200 shadow-xl">
        <div class="card-body items-center">
          <h2 class="card-title">
            Greed Machine
          </h2>

          <div class="py-8">
            <MachineCounter
              :value="
                gameStore.state?.coins_in_machine ?? 0
              "
              :jammed="
                gameStore.state?.is_jammed ?? false
              "
            />
          </div>

          <template v-if="gameStore.state">
            <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">
                  Монети
                </div>

                <div class="stat-value text-warning">
                  {{ gameStore.state.wallet }}
                </div>
              </div>

              <div class="stat">
                <div class="stat-title">
                  Бомби
                </div>

                <div class="stat-value">
                  {{ gameStore.state.bombs }}
                </div>
              </div>
            </div>

            <p class="text-lg mt-4">
              Jam Chance:
              {{
                gameStore.state.jam_chance.toFixed(2)
              }}%
            </p>

            <progress
              class="progress progress-warning w-full"
              :value="gameStore.state.jam_chance"
              max="100"
            ></progress>

            <div
              v-if="gameStore.state.is_jammed"
              class="alert alert-warning"
            >
              Автомат заклинило
            </div>

            <div
              v-else
              class="alert alert-success"
            >
              Автомат готовий
            </div>

            <button
              class="btn btn-outline w-full"
              :disabled="gameStore.loading"
              @click="gameStore.reset()"
            >
              Скинути спробу
            </button>
          </template>

          <div v-else class="alert alert-info">
            Створіть або відновіть сесію
          </div>
        </div>
      </section>

      <SessionManager />
    </main>

    <ToastContainer />
  </div>
</template>