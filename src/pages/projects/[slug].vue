<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <span class="font-bold text-slate-400">{{ project.name }}</span>
        <span class="text-green-400">{{ project.status }}</span> {{ project.description }} ratione
        voluptas deserunt labore sed distinctio nam fuga fugit vero voluptates placeat aperiam,
        saepe excepturi eos harum consectetur doloremque perspiciatis nesciunt! Incidunt
        {{ project.created_at }}, modi.
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell> {{ project?.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            v-for="collaborator in project?.collaborators"
            :key="collaborator"
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              to=""
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{{ collaborator }}</AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table v-if="project?.tasks">
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="task in project?.tasks"
              :key="task.id"
            >
              <TableCell> {{ task.name }} </TableCell>
              <TableCell> {{ task.status }} </TableCell>
              <TableCell> {{ task.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProjectWithTasks } from '@/utils/supabaseQueries'
import { projectWithTasksQuery } from '@/utils/supabaseQueries';

const route = useRoute('/projects/[slug]')

const { setError } = useErrorStore()
const { pageData } = storeToRefs(usePageStore())
const project = ref<ProjectWithTasks>()

watch(
  () => project,
  () => {
    pageData.value.title = `Project : ${(project.value)?.name || ''}`
  },
  { deep: true }
)

const getProject = async (): Promise<ProjectWithTasks|undefined|null> => {
  const { data, error, status } = await projectWithTasksQuery(route.params.slug)

  if (error) {
    setError({
      message: error.message,
      customCode: status,
      detail: error.details,
      pgCode: error.code,
    })
    return null
  }
  project.value = data
}

await getProject()
</script>

<style scoped>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md border-[1px] dark:bg-slate-900 h-80;
}
</style>
