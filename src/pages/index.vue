<template>
  <div class="bg-white w-full h-full">
    <div class="w-[400px] mx-auto">
      <TodoList :todo-list="testData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'

export default defineComponent({
  components: {
    TodoList: () => import('~/components/todo/TodoList.vue')
  },
  setup () {
    const isChecked = ref(false)

    const testData: Todo[] = [
      {
        id: '1',
        doDate: '20210830',
        context: 'Test1',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs'
      },
      {
        id: '2',
        doDate: '20210830',
        context: 'Test2',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs'
      },
      {
        id: '3',
        doDate: '20210830',
        context: 'Test3',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs'
      }
    ]

    const onChange = (checked: boolean) => {
      isChecked.value = checked
    }

    return {
      onChange,
      isChecked,
      testData
    }
  }
})

</script>
