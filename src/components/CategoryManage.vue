<template>
  <div>
    <CategoryManageModal v-show="isShowManageModal" />
    <div class="text-right">
      <button
        type="button"
        class="bg-primary_three hover:bg-primary_two text-white text-sm font-bold py-2 px-4 rounded transition-all"
        @click="toogleManageModal"
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
    const toogleManageModal = () => {
      isShowManageModal.value = !isShowManageModal.value
    }
    return {
      isShowManageModal,
      toogleManageModal,
    }
  },
})
</script>

<style></style>
