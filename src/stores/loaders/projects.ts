import { projectsWithTasksQuery } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'
import type { Projects } from '@/types'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects[]>([])

  const loadProjects = useMemoize(async (key: string) => {
    console.log(key);
    return await projectsWithTasksQuery
  })
  const validateCache = () => {
    if (projects.value?.length) {
      projectsWithTasksQuery.then(({ data, error }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          return
        } else {
          loadProjects.delete('projects')
          if (!error && data) projects.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({
      message: error.message,
      customCode: status,
      pgCode: error.code,
      detail: error.details
    })

    if (data) projects.value = data

    validateCache()
  }

  return {
    projects,
    getProjects
  }
})
