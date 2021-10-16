<template>
  <div class="w-full h-full">
    <div class="mx-auto w-96 h-60">
      <div class="flex flex-col justify-center items-center">
        <font-awesome-icon icon="user" size="2x" class="text-primary my-2 hover:text-lighter"></font-awesome-icon>
        <h1 class="text-xl mb-2 font-bold">Sign up to Here</h1>
      </div>
      <section class="flex flex-col w-full space-y-3">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button class="w-full h-12 text-white bg-primary rounded-full hover:bg-dark">
          <span>Sign Up</span>
        </button>
        <div class="w-full text-center">
          <router-link to="/Login"> Already have an account? Sign in -> </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    console.log('register')
  },
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
