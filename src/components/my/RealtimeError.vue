<template>
  <div>
    <ul
      v-if="messages"
    >
      <li
        v-for="(error, index) in messages"
        :key="index"
        class="text-red-500 text-sm text-left"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
defineProps<{messages?: string[]}>();
</script>
