<template>
  <section class="error">
    <ErrorTemplate
      :message="message"
      :custom-code="customCode"
      :detail="detail"
      :pg-code="pgCode"
      :is-custom-error="errorStore.isCustomError"
    />
  </section>
</template>

<script setup lang="ts">
const router = useRouter()
const errorStore = useErrorStore()
const { activeError } = storeToRefs(errorStore)

const error = ref(activeError.value)
const message = ref<string>('')
const detail = ref<string>('')
const pgCode = ref<string>('')

const customCode = ref<number>(0)

if (error.value) {
  message.value = error.value.message ? error.value.message : ''
  customCode.value = error.value.customCode ? error.value.customCode : 500
  detail.value =  error.value.detail ?  error.value.detail : ''
  pgCode.value = error.value.pgCode ? error.value.pgCode : ''
}

 const ErrorTemplate = import.meta.env.DEV
 ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
 :  defineAsyncComponent(() => import('./AppErrorProdSection.vue'))

router.afterEach(() => {
    errorStore.clearError()
    usePageStore().pageData.title = ''
})

</script>

<style scoped>
.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}
:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-5xl text-muted;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-1 font-light;
}

:deep(.error-footer__text) {
  @apply text-xl text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
