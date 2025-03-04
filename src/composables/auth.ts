import type { FormRegister, FormLogin } from "@/types";
import { AuthError } from "@supabase/supabase-js";
const { supabase } = useSupabaseClient();
const authStore = useAuthStore();

export function useAuth() {

  async function signUp(formData: FormRegister) {
    let errorMessage: AuthError | null = null;

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      })

    if (error) {
        errorMessage = error || new AuthError('Registration failed');
        console.error('Register error', error);
        return { data, error: errorMessage };
    }

    if (data.user) {
        // Store the entire response object
        const { error} = await supabase.from('profiles').insert([
            {
                id: data.user.id,
                username: formData.username,
                full_name: formData.first_name.concat(' ',formData.last_name),
            }
        ])

        // Check for errors in the response
        if (error) {
            errorMessage = new AuthError(error.message) || new AuthError ('Profile creation failed');
            console.error('Profiles error', error);
            return { data, error: errorMessage };
          }

        authStore.setAuth(data.session)
        return { data, error: errorMessage };

    }
  }

  async function signIn(formData: FormLogin){

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    authStore.setAuth(data.session)
    return { data, error };
  }

  async function signOut () {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error', error);
    }
    authStore.setAuth(null)
    return { error };
  }

  return {
    signUp,
    signIn,
    signOut
  };
}
