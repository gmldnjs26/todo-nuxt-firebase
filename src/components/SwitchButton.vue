<template>
  <div class="w-20 flex">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="flex items-center justify-center flex-1 bg-primary_two text-primary_four text-lg font-bold transition-all"
      :class="[item.value !== selectedValue && 'opacity-30', idx === 0 ? 'rounded-l-xl' : 'rounded-r-xl']"
      @click="changeHandler(item.value)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ['onChange'],
  setup(_, { emit }) {
    const changeHandler = (value) => {
      emit('onChange', value)
    }

    return {
      changeHandler,
    }
  },
})
</script>
