<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button
            variant="outline"
            class="w-full"
          >
            Register with Google
          </Button>
          <Separator label="Or" />
        </div>

        <form
          class="grid gap-4"
          @submit.prevent="login"
        >
          <div class="grid gap-2">
            <Label
              id="email"
              class="text-left"
            >Email</Label>
            <!-- <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              @input="handleLoginFormErrors(formData)"
            /> -->
            <Input
              v-model="formData.email"
              type="email"
              placeholder="johndoe19@example.com"
              required
            />
            <!-- Display error message if any -->
            <MyRealtimeError
              :messages="realtimeErrors?.email"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a
                href="#"
                class="inline-block ml-auto text-xs underline"
              > Forgot your password? </a>
            </div>
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              autocomplete
              required
            />
            <!-- Display error message if any -->
            <MyRealtimeError
              :messages="realtimeErrors?.password"
            />
          </div>
          <!-- Display error message if any -->
          <ul
            v-if="serverError"
            class="text-red-500 text-sm text-left mt-2"
          >
            <li>{{ serverError }}</li>
          </ul>

          <Button
            type="submit"
            class="w-full"
            :disabled="disabledButton()"
          >
            <Loader2
              v-if="isLoading"
              class="w-6 h-6 mr-2 animate-spin"
            />
            {{ 'login' }}
          </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink
            to="/register"
            class="underline"
          >
            Register
          </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { LoginForm } from '@/types';
import { AuthError } from '@supabase/supabase-js';
import { watchDebounced } from '@vueuse/core';
import MyRealtimeError from '@/components/my/RealtimeError.vue';
import { Loader2 } from 'lucide-vue-next'

const { signIn } = useAuth();
const { serverError, handleServerError, realtimeErrors, handleLoginFormErrors } = useFormErrors();

const router = useRouter();
const isLoading = ref(false);

const formData = ref<LoginForm>({
    email: '',
    password: ''
})

/**
 * WatchDebounced from VueUse to delay form validation,
 * giving users time to finish typing before errors appear
 * */
watchDebounced(formData, () => {
     handleLoginFormErrors(formData.value);
}, { debounce: 1000, deep: true });


const disabledButton = () => {
    return (realtimeErrors.value?.email?.length || realtimeErrors.value?.password?.length) || isLoading.value;
}

async function login () {
    try {
        isLoading.value = true;
        if (!formData.value.email || !formData.value.password) return;
        const response = await signIn(formData.value);

        // Check for errors in the response
        if (response.error) {
            handleServerError(response.error)
            console.error( response.error.message);
            return;
        }
        if (response.data) {
            // Redirect to login page after successful registration
            router.push('/');
        }
    } catch (err) {
        handleServerError(new AuthError('An unexpected error occurred, Please try again'));
        console.error('Unexpected error during login:', err);
    } finally {
        isLoading.value = false;
    }
}

// const loginWithGoogle = () => {
//     // Placeholder for Google authentication
//     console.log('Google authentication not implemented yet');
//     // Implementation would typically use supabase.auth.signIn({ provider: 'google' })
// }
</script>

