<template>
  <label class="flex relative cursor-pointer" :class="isDisabled ? 'opacity-50' : 'hover:opacity-60'">
    <input
      type="checkbox"
      class="w-[15px] h-[15px] opacity-0"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="change"
    />
    <font-awesome-icon
      class="absolute inset-0 text-xl"
      :class="isChecked ? 'text-blue-500' : 'text-gray-300'"
      icon="star"
    />
    <span v-show="isChecked" class="absolute left-2 top-1 w-3.5 h-3.5" :class="checkStyles" />
    <span v-show="label" class="ml-3 leading-5" :class="isChecked ? 'line-through' : ''">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    isChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    inlineText: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(_, { emit }) {
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

    const change = ({ target }: { target: HTMLInputElement }) => {
      emit('change', target.checked)
    }
    return {
      checkStyles,
      change,
    }
  },
})
</script>
