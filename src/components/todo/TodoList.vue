<template>
  <div class="w-full h-auto flex-1 flex flex-col space-y-2">
    <IconButton icon="plus" color="primary" @click="toggleTodoEditModal(i)" />
    <div v-for="(t, i) in editTodoList" :key="i" class="flex justify-between">
      <MarkBox
        :label="t.context"
        :is-checked="t.completion"
        :on-edit="t.onEdit"
        @change="onChangeCompletion(i)"
        @overEdit="onChangeContext"
      />
      <FloatMenuBtn />
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

    const editingTodoIndex = ref()

    onBeforeMount(() => {
      state.editTodoList = props.todoList.map((todo) => ({ ...todo, onEdit: false }))
    })

    const onChangeCompletion = (index: number) => {
      state.editTodoList[index].completion = !state.editTodoList[index].completion
    }

    const onChangeContext = (editContext: string) => {
      state.editTodoList[editingTodoIndex.value].onEdit = false
      state.editTodoList[editingTodoIndex.value].context = editContext
    }

    return {
      ...toRefs(state),
      onChangeCompletion,
      onChangeContext,
    }
  },
})
</script>
