<template>
  <div class="bg-gray-100 w-full h-full">
    <div class="w-[400px] mx-auto">
      <Calendar :day-todo-status-infos="dayTodoStatusInfos" />
    </div>
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
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import { dayTodoStatusInfo } from '@/types/todo'
import { accountStore } from '~/store/index'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/TodoList.vue'),
    Calendar: () => import('@/components/Calendar.vue'),
    RadioGroup: () => import('@/components/RadioGroup.vue'),
  },
  setup() {
    const selectedValue = ref(1)

    const todoList = computed(() => {
      return accountStore.todoList
    })

    const dayTodoStatusInfos = computed(() => {
      const dayTodoStatusInfos = {} as { [key: string]: dayTodoStatusInfo }
      Object.keys(accountStore.todoList).forEach((catId) => {
        accountStore.todoList[catId].forEach((todo) => {
          // FIXME: 좀 더 정확한 빈 객체의 객체 조사방법? 없나? todo.doDate in dayTodoStatusInfos 라는 방법도 있지만 상당한 속도 차이가 난다.
          // https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
          if (dayTodoStatusInfos[todo.doDate] === undefined) {
            dayTodoStatusInfos[todo.doDate] = {
              isCompletedTodoCount: 0,
              isNotCompletedTodoCount: 0,
            }
          }
          if (todo.completion) {
            dayTodoStatusInfos[todo.doDate].isCompletedTodoCount++
          } else {
            dayTodoStatusInfos[todo.doDate].isNotCompletedTodoCount++
          }
        })
      })
      return dayTodoStatusInfos
    })

    const changeCompletion = ({ catId, index }: { catId: string; index: number }) => {
      accountStore.setTodolistCompletion({ catId, index, completion: !todoList.value[catId][index].completion })
    }
    const changeContext = ({ editContext, catId, index }: { editContext: string; catId: string; index: number }) => {
      accountStore.setTodolistContext({ catId, index, context: editContext })
    }
    const remove = ({ catId, index }: { catId: string; index: number }) => {
      accountStore.removeTodoItem({ catId, index })
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
      dayTodoStatusInfos,
      changeCompletion,
      changeContext,
      remove,
      setAlarm,
      changeDate,
      addTodo,
      selectedValue,
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
