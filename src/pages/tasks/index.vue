<template>
  <div>
    <DataTable
      v-if="tasks"
      :columns="tasksColumns"
      :data="tasks"
    />
  </div>
</template>

<script setup lang="ts">
import type { TasksWithProjects } from '@/utils/supabaseQueries'
import {tasksWithProjectsQuery}  from '@/utils/supabaseQueries'

const { tasksColumns } = useTableColumns();
const { setError } = useErrorStore()
const { pageData } = storeToRefs(usePageStore())

pageData.value.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null)

async function getTasksWithProjects() {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) {
    setError({
      message: error.message,
      customCode: status,
      pgCode: error.code,
      detail: error.details
    })
    return null
  }

  if (data) tasks.value = data

}

await getTasksWithProjects()
</script>
