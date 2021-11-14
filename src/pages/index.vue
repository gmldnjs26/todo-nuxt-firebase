<template>
  <div class="bg-white w-full h-full">
    <div class="w-[400px] mx-auto">
      <TodoList
        :todo-list="todoList"
        @onChangeCompletion="changeCompletion"
        @onChangeContext="changeContext"
        @onRemove="remove"
        @onSetAlarm="setAlarm"
        @onChangeDate="changeDate"
        @addTodo="addTodo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useStore, toRefs } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'
import { accountStore } from '@/store'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/TodoList.vue'),
  },
  setup() {
    const store = useStore()
    console.log(accountStore.todoList)

    const state = reactive({
      todoList: accountStore.todoList,
    })

    const changeCompletion = (index: number) => {
      state.todoList[index].completion = !state.todoList[index].completion
    }
    const changeContext = ({ editContext, index }: { editContext: string; index: number }) => {
      state.todoList[index].context = editContext
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
    const addTodo = () => {
      state.todoList.push({
        categoryId: '1',
        id: (state.todoList.length + 2).toString(),
        doDate: '20210830',
        doTime: '2012',
        context: 'Test3',
        completion: false,
        createdAt: '20210830',
        userId: 'gmldnjs',
      })
    }
    return {
      ...toRefs(state),
      changeCompletion,
      changeContext,
      remove,
      setAlarm,
      changeDate,
      addTodo,
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
