<template>
  <div class="bg-white w-full h-full">
    <div class="w-[400px] mx-auto">
      <TodoList :todo-list="testData" />
    </div>
    <transition name="fade">
      <TodoEditModal v-show="isShowTodoEditModal" @toggleTodoEditModal="toggleTodoEditModal" @edit="edit" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/todo/TodoList.vue'),
    TodoEditModal: () => import('@/components/todo/TodoEditModal.vue'),
  },
  setup() {
    const isChecked = ref(false)

    const testData: Todo[] = [
      {
        id: '1',
        doDate: '20210830',
        context: 'Test1',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs',
      },
      {
        id: '2',
        doDate: '20210830',
        context: 'Test2',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs',
      },
      {
        id: '3',
        doDate: '20210830',
        context: 'Test3',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs',
      },
    ]

    const onChange = (checked: boolean) => {
      isChecked.value = checked
    }

    return {
      onChange,
      isChecked,
      testData,
    }
  },
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
