import type { Profiles } from "@/types"
import { profileQuery } from "@/utils/supabaseQueries"
import type { Session, User } from "@supabase/supabase-js"

export const  useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Profiles | null>(null)
  const isTrackingAuthChanges = ref(false)
  const { supabase } = useSupabaseClient()

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery({
        column: 'id',
        value: user.value.id
      })

      profile.value = data || null
    }
  }

  async function setAuth (userSession: null | Session = null) {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  async function getSession() {
      const { data } = await supabase.auth.getSession()
      if(data.session?.user) await setAuth(data.session)
  }

  //Watch for Supabase Auth changes and Update Auth Store
  async function trackAuthChanges () {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanges
  }
})



if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
