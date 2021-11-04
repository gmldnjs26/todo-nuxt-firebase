<template>
  <div class="bg-white w-full h-full">
    <div class="w-[400px] mx-auto">
      <TodoList
        :todo-list="testData"
        @onChangeCompletion="changeCompletion"
        @onChangeContext="changeContext"
        @onRemove="remove"
        @onSetAlarm="setAlarm"
        @onChangeDate="changeDate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/todo/TodoList.vue'),
  },
  setup() {
    const testData = reactive([
      {
        categoryId: '1',
        id: '1',
        doDate: '20210830',
        doTime: '2012',
        context: 'Test1',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs',
      },
      {
        categoryId: '1',
        id: '2',
        doDate: '20210830',
        doTime: '2012',
        context: 'Test2',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs',
      },
      {
        categoryId: '1',
        id: '3',
        doDate: '20210830',
        doTime: '2012',
        context: 'Test3',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs',
      },
    ])

    const changeCompletion = (index: number) => {
      testData[index].completion = !testData[index].completion
    }
    const changeContext = ({ editContext, index }: { editContext: string; index: number }) => {
      testData[index].context = editContext
    }
    const remove = () => {
      console.log('test')
    }
    const setAlarm = () => {
      console.log('test')
    }
    const changeDate = () => {
      console.log('test')
    }

    return {
      testData,
      changeCompletion,
      changeContext,
      remove,
      setAlarm,
      changeDate,
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
