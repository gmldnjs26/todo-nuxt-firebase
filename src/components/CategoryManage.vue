<template>
  <div class="text-right">
    <CategoryManageModal />
    <button class="bg-primary_three hover:bg-primary_two text-white text-sm font-bold py-2 px-4 rounded transition-all">
      카테고리 관리
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CategoryManageModal from './CategoryManageModal.vue'

export default defineComponent({
  components: { CategoryManageModal },
  setup() {},
})
</script>

<style></style>
