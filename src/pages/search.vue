<template>
  <div class="w-full h-screen">
    <h1 class="text-xl m-auto block w-10 h-10">Search</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { search } from '@/composables/search'

export default defineComponent({
  setup() {
    const { setDynamincParams } = search()
    const route = useRoute()
    setDynamincParams(route.value.path, route.value.query)
  },
})
</script>
