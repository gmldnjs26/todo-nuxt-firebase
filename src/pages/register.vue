<template>
  <div class="w-full h-full">
    <div class="mx-auto w-96 h-60">
      <div class="flex flex-col justify-center items-center">
        <font-awesome-icon icon="user" size="2x" class="text-primary_two my-2 hover:text-lighter" />
        <h1 class="text-xl mb-2 font-bold">
          Sign up to Here
        </h1>
      </div>
      <section class="flex flex-col w-full space-y-3">
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="password" type="password" placeholder="Password">
        <button class="w-full h-12 text-white bg-primary_two rounded-full hover:bg-dark" @click="onRegister">
          <span>Sign Up</span>
        </button>
        <div class="w-full text-center">
          <router-link to="/Login">
            Already have an account? Sign in ->
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup (_, context) {
    const email = ref('')
    const password = ref('')
    const username = ref('')

    const onRegister = async (): Promise<any> => {
      try {
        const credential = await context.root.$auth.createUserWithEmailAndPassword(email.value, password.value)
        console.log(credential)
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message)
        }
      }
    }

    return {
      email,
      password,
      username,
      onRegister
    }
  }
})
</script>

<style scoped>
input {
  background: #fff;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1;
  min-height: 50px;
  padding: 10px;
}
input[type='text'],
input[type='password'] {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  outline: none;
  border: 1px solid #dddddd;
}

input[type='text']:focus,
input[type='password']:focus {
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}
</style>
