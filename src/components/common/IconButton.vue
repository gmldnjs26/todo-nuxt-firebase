<template>
  <button @click.prevent="click">
    <font-awesome-icon :icon="icon" :class="styles" />
    <div>
      Test1
    </div>
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

    const click = () => {
      emit('click')
    }

    return {
      styles,
      click
    }
  }
})
</script>

<style>

</style>
