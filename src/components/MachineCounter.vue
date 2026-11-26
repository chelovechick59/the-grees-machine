<script setup lang="ts">
import { computed } from 'vue'
import GreedMachine from './GreedMachine.vue'

const props = defineProps<{
  value: number
  jammed: boolean
}>()

const hundreds = computed(() =>
  Math.floor(props.value / 100) % 10
)

const tens = computed(() =>
  Math.floor(props.value / 10) % 10
)

const units = computed(() =>
  props.value % 10
)
</script>

<template>
  <div
    :class="{
      'machine-shake': jammed
    }"
  >
    <GreedMachine>
      <span class="countdown">
        <span
          :style="{
            '--value': hundreds,
            '--digits': 1
          }"
        >
          {{ hundreds }}
        </span>
      </span>

      <span class="countdown">
        <span
          :style="{
            '--value': tens,
            '--digits': 1
          }"
        >
          {{ tens }}
        </span>
      </span>

      <span class="countdown">
        <span
          :style="{
            '--value': units,
            '--digits': 1
          }"
        >
          {{ units }}
        </span>
      </span>
    </GreedMachine>
  </div>
</template>