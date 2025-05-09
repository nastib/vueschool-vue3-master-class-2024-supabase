<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button
        variant="outline"
        size="icon"
        class="w-8 h-8"
      >
        <iconify-icon icon="lucide:menu" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        class="w-8 h-8"
      >
        <iconify-icon icon="lucide:plus" />
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SideBarLinks
          :links="links.top"
          @@link-action-clicked="onLinkActionClicked"
        />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SideBarLinks
          :links="links.down"
          @@link-action-clicked="onLinkActionClicked"
        />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { ILinkProp } from '@/types';
import { links } from './links'

const router = useRouter()
const { supabase } = useSupabaseClient()
const authStore = useAuthStore()

async function onLinkActionClicked(payload: ILinkProp) {

    if(payload.title === 'Sign out') {

        /* While implementing a logout function, we stumbled upon a challenge with using Pinia in external files, leading to unexpected errors in the sidebar component. The issue arose because Pinia wasn’t fully initialized when the store was accessed.
        In this lesson, you’ll learn how we resolved it by using dynamic imports, ensuring smooth store access at the right time.*/

        //const { signOut } = await import('@/utils/supabaseAuth')

        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Sign out error', error);
        } else {
            authStore.setAuth(null)
            router.push('/login')
        }
    }
}
</script>
