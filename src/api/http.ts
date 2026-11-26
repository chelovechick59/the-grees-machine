import axios from 'axios'
import { useSessionStore } from '../stores/sessionStore'
import { useToastStore } from '../stores/toastStore'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

http.interceptors.request.use(config => {
  const sessionStore = useSessionStore()

  if (sessionStore.activeSessionId) {
    config.headers.set(
      'X-Session-ID',
      sessionStore.activeSessionId
    )
  }

  return config
})

http.interceptors.response.use(
  response => {
    const toastStore = useToastStore()

    if (typeof response.data?.message === 'string') {
      toastStore.add(response.data.message, 'success')
    }

    return response
  },

  error => {
    const toastStore = useToastStore()
    const status = error.response?.status

    const detail = error.response?.data?.detail

    let message = ''

    switch (status) {
      case 400:
        message = 'Некоректна операція'
        break

      case 404:
        message = 'Сесію не знайдено'
        break

      case 409:
        message = 'Конфлікт стану'
        break

      case 422:
        message = 'Некоректні параметри запиту'
        break

      case 429:
        message = 'Забагато запитів'
        break

      default:
        message = status
          ? 'Помилка сервера: ' + status
          : 'Помилка з’єднання із сервером'
    }

    if (typeof detail === 'string') {
      message = detail
    }

    toastStore.add(
      message,
      status === 409 || status === 429
        ? 'warning'
        : 'error'
    )

    return Promise.reject(error)
  }
)

export default http