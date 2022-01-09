<template>
  <div class="flex">
    <IconButton
      v-show="!isShowMenu"
      class="w-5 h-5 rounded-full p-1 hover:bg-gray-200"
      icon="ellipsis-h"
      size="text-sm"
      @click="toggleMenu"
    />
    <div class="transition duration-300 transform origin-right scale-x-0" :class="styles">
      <div v-show="isShowMenu" class="flex space-x-2 rounded-lg bg-gray-100 py-0.5 px-1.5">
        <IconButton
          class="w-6 h-6 rounded-full p-1 hover:bg-gray-300"
          color="primary_one"
          icon="chevron-right"
          size="text-base"
          @click="toggleMenu"
        />
        <IconButton
          v-for="item in TODO_EDIT_EVENTS"
          :key="item.event"
          class="w-6 h-6 rounded-full p-1 hover:bg-gray-300"
          :icon="item.icon"
          color="primary_one"
          size="text-base"
          @click="$emit(item.event), toggleMenu()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { TODO_EDIT_EVENTS } from '~/utils/const'
export default defineComponent({
  components: {
    IconButton: () => import('@/components/IconButton.vue'),
  },
  setup() {
    const isShowMenu = ref(false)

    const styles = computed(() => {
      if (isShowMenu.value) {
        return 'scale-x-100'
      }
    })

    const toggleMenu = () => {
      isShowMenu.value = !isShowMenu.value
    }

    return {
      isShowMenu,
      styles,
      TODO_EDIT_EVENTS,
      toggleMenu,
    }
  },
})
</script>
