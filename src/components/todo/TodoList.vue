<template>
  <div class="w-full h-auto flex-1 flex flex-col space-y-2">
    <IconButton icon="plus" color="primary" @click="addTodo" />
    <div v-for="(t, i) in editTodoList" :key="i" class="flex justify-between">
      <MarkBox
        :label="t.context"
        :is-checked="t.completion"
        :on-edit="i === onEditTodoItemIndex"
        @change="onChangeCompletion(i)"
        @overEdit="(editContext) => onChangeContext(editContext, i)"
      />
      <FloatMenuBtn @edit="edit(i)" @remove="remove(i)" @alram="setAlram(i)" @changeDate="changeDate(i)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, ref } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'

export default defineComponent({
  components: {
    MarkBox: () => import('@/components/common/MarkBox.vue'),
    IconButton: () => import('@/components/common/IconButton.vue'),
    FloatMenuBtn: () => import('@/components/todo/FloatMenuBtn.vue'),
  },
  props: {
    todoList: {
      type: Array as PropType<Todo[]>,
      required: false,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const editTodoList = toRefs(props).todoList
    const onEditTodoItemIndex = ref(-1)

    const onChangeCompletion = (index: number) => {
      emit('onChangeCompletion', index)
    }

    const onChangeContext = (editContext: string, index: number) => {
      onEditTodoItemIndex.value = -1
      emit('onChangeContext', { editContext, index })
    }

    // event 정리
    const edit = (index: number) => {
      onEditTodoItemIndex.value = index
    }
    const remove = (index: number) => {
      emit('onRemove', index)
    }
    const setAlram = (index: number) => {
      emit('onSetAlarm', index)
    }
    const changeDate = (index: number) => {
      emit('onChangeDate', index)
    }

    const addTodo = () => {
      // FIXME: function을 내려서 비동기로 만들어준뒤 then으로 onEditTodoItemIndex을 수정하자
      emit('addTodo')
      onEditTodoItemIndex.value = props.todoList.length - 1
    }
    return {
      editTodoList,
      onEditTodoItemIndex,
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
