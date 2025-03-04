import type { QueryData } from '@supabase/supabase-js'
const { supabase } = useSupabaseClient()


/**
 * Projects queries
 */
export const projectsWithTasksQuery = supabase.from('projects').select('*')
export const projectWithTasksQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
      *,
      tasks (
        id,
        name,
        status,
        due_date
      )
      `
    )
    .eq('slug', slug)
    .single()

export type ProjectsWithTasks = QueryData<typeof projectsWithTasksQuery>
export type ProjectWithTasks = QueryData<ReturnType<typeof projectWithTasksQuery>>

/**
 * Tasks queries
 */
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    )
`)

export const taskWithProjectsQuery = (id: string) => {
  return supabase
    .from('tasks')
    .select(
      `
      *,
      projects (
        id,
        name,
        slug
      )
    `
    )
    .eq('id', id)
    .single()
}

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type TaskWithProjects = QueryData<ReturnType<typeof taskWithProjectsQuery>>


export const profileQuery = ({
  column,
  value
}: {
  column: string
  value: string
}) => {
  return supabase.from('profiles').select().eq(column, value).single()
}
