<template>
  <div :class="styles" class="space-x-2">
    <RadioButton
      v-for="(item, index) in radioContents"
      :key="index"
      :value="item.value"
      :text="item.text"
      :name="name"
      :is-checked="item.value === selectedValue"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    RadioButton: () => import('@/components/RadioButton.vue'),
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    radioContents: {
      type: Array,
      required: true,
      default: () => [],
    },
    columnCount: {
      type: Number,
      required: false,
      default: 2,
    },
    selectedValue: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const styles = computed(() => {
      return `grid grid-cols-${props.columnCount} gap-1`
    })

    const click = (value: string) => {
      emit('click', value)
    }

    return {
      styles,
      click,
    }
  },
})
</script>
