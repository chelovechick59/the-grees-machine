<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '../stores/sessionStore'
import { useGameStore } from '../stores/gameStore'

const sessionStore = useSessionStore()
const gameStore = useGameStore()

const enteredId = ref('')

function connect() {
  if (enteredId.value.trim()) {
    gameStore.connectSession(enteredId.value)
  }
}

function changeSession(event: Event) {
  const element = event.target as HTMLSelectElement

  gameStore.connectSession(element.value)
}
</script>

<template>
  <section class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        Збережені сесії
      </h2>

      <select
        class="select w-full"
        :value="sessionStore.activeSessionId"
        :disabled="gameStore.loading"
        @change="changeSession"
      >
        <option value="" disabled>
          Оберіть сесію
        </option>

        <option
          v-for="session in sessionStore.sessions"
          :key="session.id"
          :value="session.id"
        >
          {{ session.name }} — {{ session.character }}
        </option>
      </select>

      <div
        v-for="session in sessionStore.sessions"
        :key="session.id"
        class="bg-base-100 p-3 rounded-box"
      >
        <p class="font-bold">
          {{ session.name }}
        </p>

        <p>{{ session.character }}</p>

        <p class="text-xs break-all opacity-60">
          {{ session.id }}
        </p>

        <button
          class="btn btn-sm btn-outline mt-2"
          :disabled="gameStore.loading"
          @click="gameStore.connectSession(session.id)"
        >
          Відновити
        </button>
      </div>

      <div class="divider">
        Підключення за ID
      </div>

      <input
        v-model="enteredId"
        class="input w-full"
        placeholder="greed_XXXXXXXXXXXX"
        @keyup.enter="connect"
      />

      <button
        class="btn btn-secondary"
        :disabled="
          !enteredId.trim() || gameStore.loading
        "
        @click="connect"
      >
        Підключитися
      </button>
    </div>
  </section>
</template>