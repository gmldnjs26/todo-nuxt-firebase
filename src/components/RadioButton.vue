<template>
  <label class="inline-flex items-center">
    <input
      type="radio"
      :name="name"
      class="mr-1 w-4 h-4 form-radio"
      :value="value"
      :disabled="isDisabled"
      :checked="isChecked"
      @click="click(value)"
    />
    <span :class="isChecked ? 'text-blue_one font-bold' : 'text-gray-500'">{{ text }}</span>
  </label>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    text: {
      type: String,
      required: false,
      default: 'asd',
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
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
  },
  setup(props, { emit }) {
    const click = (value: string | number): string | number | void => {
      if (props.isDisabled) {
        return
      }
      emit('click', value)
    }
    return {
      click,
    }
  },
})
</script>
