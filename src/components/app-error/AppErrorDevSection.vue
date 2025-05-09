<template>
  <div>
    <iconify-icon
      icon="lucide:triangle-alert"
      class="error__icon"
    />
    <h1 class="error__code">
      Status Code: {{ customCode }}
    </h1>
    <h1
      v-if="pgCode"
      class="error__code !text-2xl"
    >
      PostgREST Codes :{{ pgCode }}
    </h1>
    <p class="error__msg">
      <span> {{ message }} </span>
    </p>
    <div class="error-footer">
      <p
        v-if="detail"
        class="error-footer__text"
      >
        {{ detail }}
      </p>
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
defineProps<{
    message: string
    detail?: string
    customCode: number
    pgCode?: string
}>()

  </script>

