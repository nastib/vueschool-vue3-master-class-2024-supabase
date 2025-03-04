<template>
  <div>
    Home Page
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/page'
usePageStore().pageData.title = 'Dashboard'
</script>
