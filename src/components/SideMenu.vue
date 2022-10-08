<template>
  <RightSideModal :is-show-modal="isShowSideMenu" @onClose="closeSideMenuHandler">
    <template #header>
      <div>
        This is Side Menu
      </div>
    </template>
    <template #body>
      <div>
        Body
      </div>
    </template>
  </RightSideModal>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import RightSideModal from '@/components/CommonUI/RightSideModal.vue'

export default defineComponent({
  components: {
    RightSideModal,
  },
  props: {
    isShowSideMenu: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onCloseSideMenu'],
  setup(_, { emit }) {
    const closeSideMenuHandler = () => {
      emit('onCloseSideMenu')
    }
    return {
      closeSideMenuHandler,
    }
  },
})
</script>
