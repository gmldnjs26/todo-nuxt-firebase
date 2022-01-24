<template>
  <div>
    <div class="fixed inset-0 w-full h-full bg-black opacity-50 z-10" @click="$emit('toggleTodoEditModal')" />
    <div class="absolute w-[350px] h-[250px] m-auto flex flex-col bg-white z-20 rounded-md p-3.5">
      <font-awesome-icon
        class="absolute text-xl top-3 right-3 hover:text-gray-300 cursor-pointer text-black"
        icon="times"
        @click="$emit('toggleTodoEditModal')"
      />
      <div class="h-20 text-2xl flex items-center justify-center">
        title
      </div>
      <div class="flex flex-wrap">
        <div v-for="(item, i) in TODO_EDIT_EVENTS" :key="i" class="flex flex-col items-center justify-center m-3">
          <IconButton
            class="w-10 h-10 rounded-full p-1 bg-gray-200 hover:bg-gray-400"
            :icon="item.icon"
            @click="$emit(item.event)"
          />
          <div class="text-sm mt-1">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { TODO_EDIT_EVENTS } from '@/utils/const'

export default defineComponent({
  components: {
    IconButton: () => import('@/components/IconButton.vue')
  },
  setup () {
    return {
      TODO_EDIT_EVENTS
    }
  }
})
</script>
