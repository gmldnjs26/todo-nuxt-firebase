<template>
  <div>
    <font-awesome-icon
      class="absolute inset-0 text-xl"
      :class="isChecked ? 'text-primary_dark' : 'text-primary'"
      icon="star"
    />
    <span v-show="isChecked" class="absolute left-2 top-1 w-3.5 h-3.5" :class="checkStyles" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const checkStyles = computed(() => {
      const classes = []
      classes.push('after:block')
      classes.push('after:transform -rotate-45')
      classes.push('after:w-2.5')
      classes.push('after:h-1.5')
      classes.push('after:border-white')
      classes.push('after:border-b-2')
      classes.push('after:border-l-2')
      return classes.join(' ')
    })

    return {
      checkStyles,
    }
  },
})
</script>

<style></style>
