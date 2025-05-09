<template>
  <div>
    <DataTableSlot
      v-if="projects"
      :columns="projectsColumns"
      :data="projects"
    >
      <template #cell-id="{ cell }">
        <div class="text-center">
          {{ cell.getValue() }}
        </div>
      </template>

      <template #cell-name="{ cell }">
        <RouterLink
          :to="`/projects/${cell.row.original.slug}`"
          class="hover:bg-muted block w-full"
        >
          {{ cell.getValue() }}
        </RouterLink>
      </template>
    </DataTableSlot>
  </div>
</template>

<script setup lang="ts">
//import type { ProjectsWithTasks } from '@/utils/supabaseQueries'
//import { projectsWithTasksQuery } from '@/utils/supabaseQueries'

const { projectsColumns } = useTableColumns();
const { pageData } = storeToRefs(usePageStore())
//const { setError } = useErrorStore()

pageData.value.title = 'Projects'

//const projects = ref<ProjectsWithTasks | null>(null)

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

onBeforeMount(async () => {
  console.log('onBefore')
})

onMounted(async () => {
  console.log('onMounted')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnMount')
})

onUnmounted(() => {
  console.log('onUnMounted')
})

// async function getProjects() {
//   console.log('onSetup')
//   const { data, error, status } = await projectsWithTasksQuery

//   if (error) {
//     setError({
//       message: error.message,
//       customCode: status,
//       pgCode: error.code,
//       detail: error.details
//     })
//     return null
//   }
//   projects.value = data

// }

await getProjects()

</script>
