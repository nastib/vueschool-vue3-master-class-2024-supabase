<template>
  <Table v-if="task">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ task.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ task.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Assignee </TableHead>
      <TableCell>Lorem ipsum</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell>{{ task.projects?.name }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ task.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            v-for="collab in task.collaborators"
            :key="collab"
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              to=""
            >
              <AvatarImage
                src=""
                alt=""
              />
              <AvatarFallback />
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
    <TableRow class="hover:bg-transparent">
      <TableHead class="align-top pt-4">
        Comments
      </TableHead>

      <TableCell>
        Comments cards goes in here..

        <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
          <textarea
            placeholder="Add your comment.."
            class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
          />
          <div class="flex justify-between mt-3">
            <Button> Comment </Button>
            <div class="flex gap-4">
              <button
                variant="ghost"
                @click.prevent
              >
                <iconify-icon icon="lucide:paperclip" />
                <span class="sr-only">Attach file</span>
              </button>
              <button
                variant="ghost"
                @click.prevent
              >
                <iconify-icon icon="lucide:image-up" />

                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </Table>
</template>

<script setup lang="ts">
import type { TaskWithProjects } from '@/utils/supabaseQueries'
import { taskWithProjectsQuery } from '@/utils/supabaseQueries'

const { pageData } = usePageStore()
const { setError } = useErrorStore()
const route = useRoute('/tasks/[id]')
const task = ref<TaskWithProjects | null>(null)

watch(
  () => task.value?.name,
  () => {
    pageData.title = `Task: ${task.value?.name || ''}`
  }
)

const getTask = async () => {
  const { data, error, status } = await taskWithProjectsQuery(route.params.id)

  if (error) {
    setError({
      message: error.message,
      customCode: status,
      pgCode: error.code,
      detail: error.details
    })
    return null
  }

  task.value = data
}

await getTask()
</script>
