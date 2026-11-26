import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast, ToastType } from '../types'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  let nextId = 0

  function remove(id: number) {
    toasts.value = toasts.value.filter(
      toast => toast.id !== id
    )
  }

  function add(
    message: string,
    type: ToastType = 'info'
  ) {
    const id = nextId++

    toasts.value.push({
      id,
      message,
      type
    })

    setTimeout(() => {
      remove(id)
    }, 4000)
  }

  return {
    toasts,
    add,
    remove
  }
})