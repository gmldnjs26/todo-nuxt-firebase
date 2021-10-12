<template>
  <div class="w-full h-auto flex-1 flex flex-col space-y-2">
    <IconButton icon="plus" color="primary" @click="toggleTodoEditModal(i)" />
    <div v-for="(t, i) in editTodoList" :key="i" class="flex justify-between">
      <MarkBox
        :label="t.context"
        :is-checked="t.completion"
        :on-edit="t.onEdit"
        @change="onChangeCompletion(i)"
        @overEdit="(editContext) => onChangeContext(editContext, i)"
      />
      <FloatMenuBtn @edit="edit(i)" @remove="remove(i)" @alram="setAlram(i)" @changeDate="changeDate(i)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, reactive, onBeforeMount } from '@nuxtjs/composition-api'
import { Todo, EditTodo } from '@/types/todo'

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
  setup(props) {
    const state = reactive({
      editTodoList: [] as EditTodo[],
    })

    onBeforeMount(() => {
      state.editTodoList = props.todoList.map((todo) => ({ ...todo, onEdit: false }))
    })

    const onChangeCompletion = (index: number) => {
      state.editTodoList[index].completion = !state.editTodoList[index].completion
    }

    const onChangeContext = (editContext: string, index: number) => {
      state.editTodoList[index].onEdit = false
      state.editTodoList[index].context = editContext
    }

    // event 정리
    const edit = (index: number) => {
      state.editTodoList[index].onEdit = true
    }
    const remove = (index: number) => {
      console.log(index)
    }
    const setAlram = (index: number) => {
      console.log(index)
    }
    const changeDate = (index: number) => {
      console.log(index)
    }

    return {
      ...toRefs(state),
      onChangeCompletion,
      onChangeContext,
      edit,
      remove,
      setAlram,
      changeDate,
    }
  },
})
</script>
