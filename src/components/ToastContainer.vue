<script setup lang="ts">
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()

const styles = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info'
}
</script>

<template>
  <div class="toast toast-top toast-end z-50">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="alert shadow-lg"
      :class="styles[toast.type]"
    >
      <span>{{ toast.message }}</span>

      <button
        class="btn btn-ghost btn-xs"
        @click="toastStore.remove(toast.id)"
      >
        ✕
      </button>
    </div>
  </div>
</template>