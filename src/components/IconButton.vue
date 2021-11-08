<template>
  <button class="flex items-center justify-center" @click.prevent="click">
    <font-awesome-icon :icon="icon" :class="styles" />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    color: {
      type: String,
      required: false,
      default: 'black',
    },
    icon: {
      type: [String, Array],
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: 'text-xl',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const styles = computed(() => {
      const classes = []
      classes.push(props.size)
      classes.push('text-' + props.color)
      return classes.join(' ')
    })

    const click = () => {
      emit('click')
    }

    return {
      styles,
      click,
    }
  },
})
</script>

<style></style>
