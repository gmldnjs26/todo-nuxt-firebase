<template>
  <div>
    <CategoryManageModal v-show="isShowManageModal" @close="onClose" />
    <div class="text-right">
      <button
        type="button"
        class="bg-primary_three hover:bg-primary_two text-white text-sm font-bold py-2 px-4 rounded transition-all"
        @click="onOpen"
      >
        카테고리 관리
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CategoryManageModal from './CategoryManageModal.vue'

export default defineComponent({
  components: { CategoryManageModal },
  setup() {
    const isShowManageModal = ref(false)
    const onOpen = () => {
      isShowManageModal.value = true
    }
    const onClose = () => {
      isShowManageModal.value = false
    }
    return {
      isShowManageModal,
      onOpen,
      onClose,
    }
  },
})
</script>

<style></style>
