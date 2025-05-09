import type { Projects } from "@/types";
import type { ColumnDef } from "@tanstack/vue-table";
import type { TasksWithProjects } from "@/types";
import { RouterLink } from "vue-router/auto"

export function useTableColumns() {
  //@ts-ignore
  const projectsColumns = ref<ColumnDef<Projects[0]>[]>([
    {
      accessorKey: 'id',
      header: () => h('div', { class: 'text-center' }, 'ID')
    },
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-left' }, 'Name')
    },
    {
      accessorKey: 'slug',
      header: () => h('div', { class: 'text-left' }, 'Status')
    },
    {
      accessorKey: 'created_at',
      header: () => h('div', { class: 'text-left' }, 'Created At')
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'text-left' }, 'Status')
    },
    {
      accessorKey: 'collaborators',
      header: () => h('div', { class: 'text-left' }, 'Collaborators')
    }
  ])

  const tasksColumns = ref<ColumnDef<TasksWithProjects[0]>[]> ([
    {
      accessorKey: 'id',
      header: () => h('div', { class: 'text-center' }, 'ID'),
      cell: ({ row }) => {
        return h('div', { class: 'text-center font-medium' }, row.getValue('id'))
      }
    },
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-left' }, 'Name'),
      cell: ({ row }) => {
        return h(
          RouterLink,
          {
            to: `/tasks/${row.original.id}`,
            class: 'text-left font-medium hover:bg-muted block w-full'
          },
          () => row.getValue('name')
        )
      }
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'text-left' }, 'Status'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
      }
    },
    {
      accessorKey: 'due_date',
      header: () => h('div', { class: 'text-left' }, 'Due Date'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
      }
    },
    {
      accessorKey: 'projects',
      header: () => h('div', { class: 'text-left' }, 'Project'),
      cell: ({ row }) => {
        return row.original.projects
          ? h(
              RouterLink,
              {
                to: `/projects/${row.original.projects.slug}`,
                class: 'text-left font-medium hover:bg-muted block w-full'
              },
              () => row.original.projects?.name
            )
          : ''
      }
    },
    {
      accessorKey: 'collaborators',
      header: () => h('div', { class: 'text-left' }, 'Collaborators'),
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'text-left font-medium' },
          JSON.stringify(row.getValue('collaborators'))
        )
      }
    }
  ])

  return {
    projectsColumns,
    tasksColumns
  };
}
