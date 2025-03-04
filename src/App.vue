<template>
  <DefaultLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView
      v-else
      v-slot="{ Component, route }"
    >
      <Suspense
        v-if="Component"
        :timeout="0"
      >
        <Component
          :is="Component"
          :key="route.name"
        />

        <template #fallback>
          <div class="flex justify-center items-center">
            <Loader2 class="w-6 h-6 mr-2 animate-spin" />
            <span class="text-[12px]">Loading ...</span>
          </div>
        </template>
      </Suspense>
    </RouterView>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from './layouts/default.vue'
import { Loader2 } from 'lucide-vue-next'

const errorStore = useErrorStore()
const authStore = useAuthStore()

onErrorCaptured((error) => {
  errorStore.setError({
    message: error.message,
    customCode: 500,
    detail: error.stack
  })
  return true
})

onMounted(() => {
    authStore.trackAuthChanges()
})
</script>
