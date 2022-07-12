<template>
  <div>
    <div class="fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40"></div>
    <div class="fixed inset-0 z-10 m-auto bg-white shadow-md animate-appear rounded-md w-[370px] max-h-[500px]">
      <div class="flex overflow-auto flex-col w-full h-full">
        <!-- header -->
        <div class="flex justify-between items-center px-5 h-16 text-sm font-semibold bg-bgColor-basic">
          <label class="text-gray-700">카테고리 관리</label>
        </div>
        <!-- /header -->

        <!-- body -->
        <div class="overflow-auto flex-1 px-5 mt-5 w-full h-full">body</div>

        <!-- footer -->
        <div class="flex justify-between items-center px-4 h-20 bg-opacity-10 border-t-2 border-gray-200 ring-white">footer</div>
        <!-- /footer -->
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss" scoped></style>
