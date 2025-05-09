<template>
  <div>
    <!-- Use the Vue.js Template Special Element with v-for Loops to manage conditional rendering of links.
    By nesting both routerLink and action links inside a <template>, we can efficiently use v-for and v-if together, allowing for a cleaner approach to rendering based on the presence of the to property.
    -->
    <template
      v-for="link in props.links"
      :key="link.title"
    >
      <RouterLink
        v-if="link.to"
        exact-active-class="router-link-exact-active"
        :to="link.to"
        class="nav-link"
      >
        <iconify-icon :icon="link.icon" />
        <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
      </RouterLink>
      <div
        v-else
        class="nav-link cursor-pointer"
        @click.prevent="handleLinkActionClicked(link)"
      >
        <iconify-icon :icon="link.icon" />
        <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ILinkProp } from '@/types'

const emit = defineEmits<{
    (e: '@linkActionClicked', link: ILinkProp): ILinkProp
}>()

const props = defineProps<{
  links: ILinkProp[] | []
}>()

function handleLinkActionClicked(link: ILinkProp) {
  emit('@linkActionClicked', link)
}

//const filteredLinks = props.links.filter((link): link is ILinkProp & { to: string } => !!link.to)
</script>

<style scoped>
.router-link-exact-active {
   @apply text-primary bg-muted
}

.nav-link {
    @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground
}
</style>
