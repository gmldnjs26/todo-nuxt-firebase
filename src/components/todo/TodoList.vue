<template>
  <div class="w-full h-auto flex-1 flex flex-col space-y-2">
    <div v-for="(t, i) in editTodoList" :key="i" class="flex justify-between">
      <MarkBox :label="t.context" :is-checked="t.completion" @change="onChange(i)" />
      <IconButton icon="ellipsis-h" @click="toggleTodoEditModal" />
    </div>
    <transition name="fade">
      <TodoEditModal v-show="isShowTodoEditModal" @toggleTodoEditModal="toggleTodoEditModal" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, reactive, onBeforeMount } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'

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
      editTodoList: [] as Todo[],
    })

    const isShowTodoEditModal = ref(false)
    const toggleTodoEditModal = () => {
      isShowTodoEditModal.value = !isShowTodoEditModal.value
    }

    onBeforeMount(() => {
      state.editTodoList = props.todoList
    })

    const onChange = (index: number) => {
      state.editTodoList[index].completion = !state.editTodoList[index].completion
    }

    return {
      ...toRefs(state),
      onChange,
      isShowTodoEditModal,
      toggleTodoEditModal,
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
