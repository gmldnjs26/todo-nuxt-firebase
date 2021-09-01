<template>
  <div class="bg-white h-[350px]">
    <font-awesome-layers class="fa-4x">
      <font-awesome-icon icon="download" />
    </font-awesome-layers>
    This is Index Page
    <font-awesome-icon class="fa-x text-blue-900" icon="star" />
    <TodoList :todo-list="testData" />
    <MarkBox :is-checked="isChecked" label="testtext" @change="onChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/TodoList.vue'),
    MarkBox: () => import('@/components/common/MarkBox.vue')
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
