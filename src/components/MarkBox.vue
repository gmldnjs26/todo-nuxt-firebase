<template>
  <label ref="root" class="flex relative cursor-pointer" :class="isDisabled ? 'opacity-50' : 'hover:opacity-60'">
    <input type="checkbox" class="hidden" :checked="isChecked" :disabled="isDisabled" @change="change" />
    <MarkIcon :is-checked="isChecked" />
    <span v-show="label && !onEdit" class="ml-1 leading-5 py-0.5 px-1" :class="isChecked ? 'line-through' : ''">
      {{ label }}
    </span>
    <input
      v-show="label && onEdit"
      ref="editInput"
      v-model="editContext"
      class="ml-1 leading-5 border-none rounded-md py-0.5 px-1"
      @blur="$emit('overEdit', editContext)"
      @keyup.enter="$emit('overEdit', editContext)"
    />
  </label>
</template>

<script lang="ts">
import { ref, defineComponent, watch, onMounted } from '@nuxtjs/composition-api'
export default defineComponent({
  components: {
    MarkIcon: () => import('@/components/MarkIcon.vue'),
  },
  props: {
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
    onEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit, refs }) {
    onMounted(() => {
      if (props.onEdit) {
        if (refs.editInput instanceof HTMLInputElement) {
          refs.editInput.focus()
        }
      }
    })
    const editContext = ref('')

    editContext.value = props.label

    const change = ({ target }: { target: HTMLInputElement }) => {
      emit('change', target.checked)
    }

    watch(
      () => props.onEdit,
      (): void => {
        setTimeout(() => {
          if (refs.editInput instanceof HTMLInputElement) {
            refs.editInput.focus()
          }
        })
      },
    )
    return {
      change,
      editContext,
    }
  },
})
</script>
