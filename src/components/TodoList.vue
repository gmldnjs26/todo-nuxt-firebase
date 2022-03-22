<template>
  <div class="w-full h-auto flex-1 flex flex-col space-y-2 mb-2">
    <div
      class="w-[80px] bg-gray-200 mt-2 py-2 px-1 rounded-md flex justify-between hover:bg-gray-400 cursor-pointer"
      @click="addTodo"
    >
      <font-awesome-icon :class="`text-sm text-left text-${categoryInfo.color}-500`" :icon="categoryInfo.icon" />
      <div class="text-xs">
        {{ categoryInfo.name }}
      </div>
      <font-awesome-icon class="text-sm text-right" icon="plus" color="primary_two" />
    </div>
    <div v-for="(t, i) in editTodoList" :key="i" class="flex justify-between">
      <MarkBox
        :label="t.context"
        :is-checked="t.completion"
        :on-edit="i === onEditTodoItemIndex"
        @change="onChangeCompletion(t.id, !t.completion)"
        @overEdit="(editContext) => onChangeContext(t.id, editContext)"
      />
      <FloatMenuBtn @edit="edit(i)" @remove="remove(t.id)" @alram="setAlram(t.id)" @changeDate="changeDate(t.id)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, ref, computed, nextTick } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'
import { accountStore } from '@/store/index'

export default defineComponent({
  components: {
    MarkBox: () => import('@/components/MarkBox.vue'),
    FloatMenuBtn: () => import('@/components/FloatMenuBtn.vue'),
  },
  props: {
    todoList: {
      type: Array as PropType<Todo[]>,
      required: false,
      default: () => [],
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editTodoList = toRefs(props).todoList
    const onEditTodoItemIndex = ref(-1)

    const categoryInfo = computed(() => {
      return accountStore.categoryList.find((item) => item.id === props.categoryId)
    })

    const onChangeCompletion = (todoId: string, completion: boolean) => {
      emit('onChangeCompletion', { todoId, completion })
    }

    const onChangeContext = (todoId: string, editContext: string) => {
      onEditTodoItemIndex.value = -1
      emit('onChangeContext', { todoId, editContext })
    }

    // event 정리
    const edit = (index: number) => {
      onEditTodoItemIndex.value = index
    }
    const remove = (todoId: String) => {
      emit('onRemove', todoId)
    }
    const setAlram = (todoId: String) => {
      emit('onSetAlarm', todoId)
    }
    const changeDate = (todoId: String) => {
      emit('onChangeDate', todoId)
    }

    const addTodo = () => {
      // FIXME: function을 내려서 비동기로 만들어준뒤 then으로 onEditTodoItemIndex을 수정하자
      emit('addTodo', props.categoryId)
      nextTick(() => {
        onEditTodoItemIndex.value = props.todoList.length - 1
      })
    }
    return {
      editTodoList,
      onEditTodoItemIndex,
      categoryInfo,
      onChangeCompletion,
      onChangeContext,
      edit,
      remove,
      setAlram,
      changeDate,
      addTodo,
    }
  },
})
</script>
