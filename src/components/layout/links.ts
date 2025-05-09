import type { ILinkProp } from '@/types/index'

export const links = ref<{ top: ILinkProp[]; down: ILinkProp[] }>({
  top: [
    {
      title: 'Dashboard',
      to: '/',
      icon: 'lucide:house'
    },
    {
      title: 'Projects',
      to: '/projects',
      icon: 'lucide:building-2'
    },
    {
      title: 'Tasks',
      to: '/tasks',
      icon: 'lucide:badge-check'
    }
  ],
  down: [
    {
      title: 'Profile',
      to: '/profile',
      icon: 'lucide:user'
    },
    {
      title: 'Messages',
      icon: 'lucide:message-circle'
    },
    {
      title: 'Settings',
      to: '/settings',
      icon: 'lucide:settings'
    },
    {
      title: 'Sign out',
      icon: 'lucide:log-out'
    }
  ]
})
