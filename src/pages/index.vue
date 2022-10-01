<template>
  <div class="bg-gray-50 w-full h-screen">
    <div class="w-[370px] mx-auto pt-8">
      <Calendar :day-todo-status-infos="dayTodoStatusInfos" @onSelectDate="onSelectDate" />
    </div>
    <div class="w-[370px] mx-auto">
      <CategoryManage />
      <TodoList
        v-for="category in categoryList"
        :key="category.id"
        :todo-list="todoListOfselectedDate.filter((item) => item.categoryId === category.id)"
        :category-id="category.id"
        @onChangeCompletion="changeCompletion"
        @onChangeContext="changeContext"
        @onRemove="remove"
        @onSetAlarm="setAlarm"
        @onChangeDate="changeDate"
        @onAddTodo="addTodo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref } from '@nuxtjs/composition-api'
import format from 'date-fns/format'
import { dayTodoStatusInfo } from '@/types/todo'
import { guestStore } from '@/store/index'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/TodoList.vue'),
    Calendar: () => import('@/components/Calendar.vue'),
    CategoryManage: () => import('@/components/CategoryManage.vue'),
  },
  setup() {
    const selectedValue = ref(1)
    const selectedDate = ref(new Date()) as Ref<Date>

    const categoryList = computed(() => {
      return guestStore.categoryList
    })

    const todoListOfselectedDate = computed(() => {
      return guestStore.todoList.filter((item) => item.doDate === format(selectedDate.value, 'yyyy-MM-dd'))
    })

    const dayTodoStatusInfos = computed(() => {
      const dayTodoStatusInfos = {} as { [key: string]: dayTodoStatusInfo }
      if (guestStore.todoList) {
        guestStore.todoList.forEach((todo) => {
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
      }
      return dayTodoStatusInfos
    })

    const changeCompletion = ({ todoId, completion }: { todoId: string; completion: boolean }) => {
      guestStore.setTodolistCompletion({ todoId, completion })
    }
    const changeContext = ({ todoId, editContext }: { todoId: string; editContext: string }) => {
      guestStore.setTodolistContext({ todoId, context: editContext })
    }
    const remove = (todoId: string) => {
      guestStore.removeTodoItem(todoId)
    }
    const setAlarm = () => {
      console.log('test')
    }
    const changeDate = () => {
      console.log('test')
    }
    const addTodo = (catId: string) => {
      guestStore.addTodolist({ catId, date: format(selectedDate.value, 'yyyy-MM-dd') })
    }
    // watch(toRefs.todoList, (cur: { [key: string]: Array<Todo> }, prev: { [key: string]: Array<Todo> }): void => {
    //   console.log(prev, cur)
    // })

    const onSelectDate = (value: Date) => {
      selectedDate.value = value
    }
    return {
      todoListOfselectedDate,
      categoryList,
      dayTodoStatusInfos,
      changeCompletion,
      changeContext,
      remove,
      setAlarm,
      changeDate,
      addTodo,
      selectedValue,
      selectedDate,
      onSelectDate,
      format,
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
