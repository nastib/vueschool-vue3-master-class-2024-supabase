<template>
  <div>
    <iconify-icon
      icon="lucide:triangle-alert"
      class="error__icon"
    />
    <h1 class="error__code">
      Status Code: {{ error.code }}
    </h1>
    <p class="error__msg !text-2xl">
      <span> {{ error.message }} </span>
    </p>
    <div class="error-footer">
      <p class="error-footer__text !text-xs">
        You'll find lots to explore on the home page.
      </p>

      <RouterLink to="/">
        <Button class="max-w-36">
          Back to homepage
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
      message: string
      customCode: number
      isCustomError: boolean
  }>()

  const error = ref({
    code: 500,
    message: 'Ops, something went wrong',
  })

  if(props.isCustomError) {
    error.value.code = props.customCode
    error.value.message = props.message
  }

  if(props.customCode === 406) {
    error.value.code = 404
    error.value.message = "Sorry, we couldn't find this page"
  }
</script>
