import type { CustomError } from '@/types'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null)
  const isCustomError = ref(false)

  function setError({
    message,
    customCode,
    detail,
    pgCode
  }: {
    message: string
    customCode: number
    detail?: string
    pgCode?: string
  }) {
    activeError.value = Error(message)
    activeError.value.customCode = customCode
    detail ? activeError.value.detail = detail : null
    pgCode ? activeError.value.pgCode = pgCode : null

    if(!pgCode && customCode && customCode !== 500) {
      isCustomError.value = true
    }
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
