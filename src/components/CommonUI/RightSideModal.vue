<template>
  <transition
    @before-enter="rightSideBeforeEnter"
    @enter="rightSideEnter"
    @before-leave="rightSideBeforeLeave"
    @leave="rightSideLeave"
  >
    <div v-show="isShowModal" class="fixed inset-0 z-50 flex justify-end" @click.self="closeModalHandler">
      <div class="rounded-l-sm w-[280px] h-full bg-white p-4">
        <div class="flex items-center text-lg font-bold mb-4">
          <slot name="header" />
        </div>
        <div class="overflow-auto h-full pb-6">
          <slot name="body" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, watch } from '@nuxtjs/composition-api'
import { useModal } from '@/composables/useModal'
import { useTransition } from '@/composables/useTransition'
export default defineComponent({
  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['open', 'close'],
  setup(props, { emit }) {
    const { onOffBodyScroll } = useModal()
    const { rightSideBeforeEnter, rightSideEnter, rightSideBeforeLeave, rightSideLeave } = useTransition()
    watch(
      () => props.isShowModal,
      () => {
        onOffBodyScroll()
      },
    )
    const openModalHandler = () => {
      emit('onOpen')
    }
    const closeModalHandler = () => {
      emit('onClose')
    }
    return {
      openModalHandler,
      closeModalHandler,
      rightSideBeforeEnter,
      rightSideEnter,
      rightSideBeforeLeave,
      rightSideLeave,
    }
  },
})
</script>
