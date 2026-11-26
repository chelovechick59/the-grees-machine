<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const selectedId = ref('isaac')
const sessionName = ref('')

const selectedCharacter = computed(() =>
  gameStore.characters.find(
    character => character.id === selectedId.value
  )
)

function create() {
  gameStore.createSession(
    selectedId.value,
    sessionName.value.trim() || 'Новий забіг'
  )
}
</script>

<template>
  <section class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        Персонаж
      </h2>

      <select
        v-model="selectedId"
        class="select w-full"
      >
        <option
          v-for="character in gameStore.characters"
          :key="character.id"
          :value="character.id"
        >
          {{ character.name }}
        </option>
      </select>

      <div
        v-if="selectedCharacter"
        class="flex flex-col items-center gap-3"
      >
        <img
          :src="selectedCharacter.avatar_url"
          :alt="selectedCharacter.name"
          class="w-24 h-24 object-contain"
        />

        <h3 class="font-bold text-xl">
          {{ selectedCharacter.name }}
        </h3>

        <p>{{ selectedCharacter.description }}</p>

        <div class="w-full space-y-2">
          <p>
            Монети:
            {{ selectedCharacter.starting_coins }}
          </p>

          <p>
            Бомби:
            {{ selectedCharacter.starting_bombs }}
          </p>

          <p>
            Удача:
            {{ selectedCharacter.luck }}
          </p>
        </div>
      </div>

      <input
        v-model="sessionName"
        class="input w-full"
        placeholder="Назва сесії"
      />

      <button
        class="btn btn-primary"
        :disabled="
          gameStore.loading || !selectedCharacter
        "
        @click="create"
      >
        Нова сесія
      </button>

      <button
        class="btn btn-outline"
        :disabled="
          gameStore.loading ||
          !gameStore.state ||
          !selectedCharacter
        "
        @click="gameStore.selectCharacter(selectedId)"
      >
        Змінити персонажа
      </button>
    </div>
  </section>
</template>