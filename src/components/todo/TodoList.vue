<template>
  <div class="w-full h-auto flex-1 flex flex-col space-y-2">
    <div v-for="(t, i) in editTodoList" :key="i" class="flex justify-between">
      <MarkBox
        :label="t.context"
        :is-checked="t.completion"
        :on-edit="t.onEdit"
        @change="onChangeCompletion(i)"
        @overEdit="onChangeContext"
      />
      <IconButton icon="ellipsis-h" color="primary" @click="toggleTodoEditModal(i)" />
    </div>
    <transition name="fade">
      <TodoEditModal v-show="isShowTodoEditModal" @toggleTodoEditModal="toggleTodoEditModal" @edit="edit" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, reactive, onBeforeMount } from '@nuxtjs/composition-api'
import { Todo, EditTodo } from '@/types/todo'

export default defineComponent({
  components: {
    MarkBox: () => import('@/components/common/MarkBox.vue'),
    IconButton: () => import('@/components/common/IconButton.vue'),
    TodoEditModal: () => import('@/components/todo/TodoEditModal.vue'),
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

    const isShowTodoEditModal = ref(false)
    const toggleTodoEditModal = (index: Number) => {
      editingTodoIndex.value = index
      isShowTodoEditModal.value = !isShowTodoEditModal.value
    }

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

    const edit = () => {
      state.editTodoList[editingTodoIndex.value].onEdit = true
      isShowTodoEditModal.value = false
    }

    return {
      ...toRefs(state),
      onChangeCompletion,
      isShowTodoEditModal,
      toggleTodoEditModal,
      edit,
      onChangeContext,
    }
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
