<template>
  <div>
    <div class="fixed inset-0 w-full h-full bg-black opacity-50 z-10" @click="$emit('toggleTodoEditModal')" />
    <div class="absolute w-[350px] h-[350px] m-auto flex flex-col bg-blue-500 z-20">
      <div>
        title
      </div>
      <div class="flex-1 flex">
        <div>
          <IconButton icon="edit" />
          <div>
            수정
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    IconButton: () => import('@/components/common/IconButton.vue')
  },
  setup () {

  }
})
</script>
