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
import { defineComponent, reactive, toRefs, watch, computed } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'
import { accountStore } from '~/store/index'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/TodoList.vue'),
  },
  setup() {
    // const state = reactive({
    //   todoList: JSON.parse(JSON.stringify(accountStore.todoList)),
    // })

    const todoList = computed(() => {
      return accountStore.todoList
    })

    const changeCompletion = ({ catId, index }: { catId: string; index: number }) => {
      accountStore.setTodolistCompletion({ catId, index, completion: !todoList.value[catId][index].completion })
    }
    const changeContext = ({ editContext, catId, index }: { editContext: string; catId: string; index: number }) => {
      accountStore.setTodolistContext({ catId, index, context: editContext })
    }
    const remove = ({ catId, index }: { catId: string; index: number }) => {
      const removedItem = todoList.value[catId].splice(index, 1)
      console.log(removedItem)
    }
    const setAlarm = () => {
      console.log('test')
    }
    const changeDate = () => {
      console.log('test')
    }
    const addTodo = (catId: string) => {
      accountStore.addTodolist(catId)
    }
    // watch(toRefs.todoList, (cur: { [key: string]: Array<Todo> }, prev: { [key: string]: Array<Todo> }): void => {
    //   console.log(prev, cur)
    // })
    return {
      todoList,
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
