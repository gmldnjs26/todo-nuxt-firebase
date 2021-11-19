<template>
  <div class="bg-white w-full h-full">
    <div class="w-[400px] mx-auto">
      <TodoList
        v-for="(todoListByCat, catId) in todoList"
        :key="catId"
        :todo-list="todoListByCat"
        :category-id="catId"
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
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'
import { accountStore } from '~/store/index'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/TodoList.vue'),
  },
  setup() {
    const state = reactive({
      todoList: accountStore.todoList,
    })

    const changeCompletion = ({ catId, index }: { catId: string; index: number }) => {
      state.todoList[catId][index].completion = !state.todoList[catId][index].completion
    }
    const changeContext = ({ editContext, catId, index }: { editContext: string; catId: string; index: number }) => {
      state.todoList[catId][index].context = editContext
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
    const addTodo = (catId: string) => {
      state.todoList[catId].push({
        categoryId: '1',
        id: (state.todoList[catId].length + 2).toString(),
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
