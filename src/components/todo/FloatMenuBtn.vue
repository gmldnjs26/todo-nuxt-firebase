<template>
  <div>
    <IconButton
      v-show="!isShowMenu"
      class="w-5 h-5 rounded-full p-1 bg-gray-400 hover:bg-gray-400"
      icon="ellipsis-h"
      size="text-sm"
      @click="toggleMenu"
    />
    <div v-show="isShowMenu" class="flex">
      <button>asd</button>
      <button>asd</button>
      <button>asd</button>
      <button>asd</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  components: {
    IconButton: () => import('@/components/common/IconButton.vue'),
  },
  setup() {
    const isShowMenu = ref(false)

    const toggleMenu = () => {
      isShowMenu.value = !isShowMenu.value
    }

    return {
      isShowMenu,
      toggleMenu,
    }
  },
})
</script>

<style></style>
