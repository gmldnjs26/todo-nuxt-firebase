<template>
  <div
    class="min-w-[80px] bg-white w-min shadow-md mt-2 py-2 px-1 rounded-md flex hover:opacity-60 cursor-pointer"
    @click="addTodoFunc"
  >
    <div class="w-3/12">
      <font-awesome-icon class="text-sm w-3/12 text-left" :icon="categoryIcon" />
    </div>
    <div class="w-6/12 text-center">
      <span class="text-xs font-semibold">{{ categoryName }}</span>
    </div>
    <div class="w-3/12">
      <font-awesome-icon class="text-xs text-right" icon="plus" color="primary_two" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    categoryIcon: {
      type: String,
      default: '',
    },
    categoryName: {
      type: String,
      default: '',
    },
    addTodoFunc: {
      type: Function,
      default: () => {},
    },
  },
  setup() {},
})
</script>

<style></style>
