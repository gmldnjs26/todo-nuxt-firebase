<template>
  <button @click.prevent="onClick">
    <font-awesome-icon :icon="icon" :class="styles" />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'text-xl'
    }
  },
  emits: ['click'],
  setup (props, { emit }) {
    const styles = computed(() => {
      const classes = []
      classes.push(props.size)
      return classes.join(' ')
    })

    const onClick = () => {
      emit('click')
    }

    return {
      styles,
      onClick
    }
  }
})
</script>

<style>

</style>
