<template>
  <div
    class="mx-auto w-full flex justify-center items-center p-10 text-center -mt-10 min-h-[90vh] h-full"
  >
    <Card class="max-w-sm w-full mx-auto h-full">
      <CardHeader>
        <CardTitle class="text-2xl">
          Register
        </CardTitle>
        <CardDescription> Create a new account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button
            variant="outline"
            class="w-full"
            @click="registerWithGoogle"
          >
            Register with Google
          </Button>
          <Separator label="Or" />
        </div>
        <form
          class="grid gap-4"
          @submit.prevent="register"
        >
          <div class="grid gap-2">
            <Label
              id="username"
              class="text-left"
            >Username</Label>
            <Input
              id="username"
              v-model="formData.username"
              type="text"
              placeholder="johndoe19"
              required
            />
            <MyRealtimeError
              :messages="realtimeErrors?.username"
            />
          </div>
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <div class="grid gap-2">
              <Label
                id="first_name"
                class="text-left"
              >First Name</Label>
              <Input
                id="first_name"
                v-model="formData.first_name"
                type="text"
                placeholder="John"
                required
              />
              <MyRealtimeError
                :messages="realtimeErrors?.first_name"
              />
            </div>
            <div class="grid gap-2">
              <Label
                id="last_name"
                class="text-left"
              >Last Name</Label>
              <Input
                id="last_name"
                v-model="formData.last_name"
                type="text"
                placeholder="Doe"
                required
              />
              <MyRealtimeError
                :messages="realtimeErrors?.last_name"
              />
            </div>
          </div>
          <div class="grid gap-2">
            <Label
              id="email"
              class="text-left"
            >Email</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="johndoe19@example.com"
              required
            />
            <MyRealtimeError
              :messages="realtimeErrors?.email"
            />
          </div>

          <div class="grid gap-2">
            <Label
              id="password"
              class="text-left"
            >Password</Label>
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="*****"
              autocomplete
              required
            />
            <MyRealtimeError
              :messages="realtimeErrors?.password"
            />
          </div>

          <div class="grid gap-2">
            <Label
              id="confirm_password"
              class="text-left"
            >Confirm Password</Label>
            <Input
              id="confirm_password"
              v-model="formData.confirm_password"
              type="password"
              placeholder="*****"
              autocomplete
              required
            />
            <MyRealtimeError
              :messages="realtimeErrors?.confirm_password"
            />
          </div>
          <!-- Display error message if any -->

          <p
            class="text-red-500 text-sm text-left mb-2"
          >
            {{ serverError }}
          </p>

          <Button
            type="submit"
            class="w-full"
            :disabled="disabledButton()"
          >
            <Loader2
              v-if="isLoading"
              class="w-6 h-6 mr-2 animate-spin"
            />

            Register
          </Button>
          <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
        </form>
        <div class="mt-4 text-sm text-center">
          Already have an account?
          <RouterLink
            to="/login"
            class="underline"
          >
            Login
          </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
<script setup lang="ts">
import type { RegisterForm } from '@/types';
import { AuthError } from '@supabase/supabase-js';
import { watchDebounced } from '@vueuse/core';
import { useRouter } from 'vue-router';
import MyRealtimeError from '@/components/my/RealtimeError.vue';
import { Loader2 } from 'lucide-vue-next';

const { signUp } = useAuth();
const router = useRouter();

const { serverError, handleServerError, realtimeErrors, handleRegisterFormErrors } = useFormErrors();
const isLoading = ref<boolean>(false);

const formData = ref<RegisterForm>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
})

/**
 * WatchDebounced from VueUse to delay form validation,
 * giving users time to finish typing before errors appear
 * */
 watchDebounced(formData, () => {
    handleRegisterFormErrors(formData.value);
}, { debounce: 1000, deep: true });

const disabledButton = () => {
    return (realtimeErrors.value?.email?.length || realtimeErrors.value?.password?.length || realtimeErrors.value?.username?.length || realtimeErrors.value?.first_name?.length || realtimeErrors.value?.last_name?.length) || isLoading.value;
}

const register = async () => {

    try {
        isLoading.value = true;

        const response = await signUp(formData.value);
        // Check for errors in the response
        if (response?.error) {
            handleServerError(response.error);
            console.error('Profiles error', response.error);
            return;
        }
        if (response?.data) {
            // Redirect to login page after successful registration
            router.push('/login');
        }
    } catch (err) {
        console.error('Unexpected error during registration:', err);
        handleServerError( new AuthError('An unexpected error occurred, Please try again'));
    } finally {
        isLoading.value = false;
    }
}

const registerWithGoogle = () => {
    // Placeholder for Google authentication
    console.log('Google authentication not implemented yet');
    // Implementation would typically use supabase.auth.signIn({ provider: 'google' })
}
</script>
