<template>
  <div class="w-full h-auto flex-1 flex flex-col space-y-2">
    <div class="flex justify-between" v-for="(t, i) in editTodoList" :key="i">
      <MarkBox :label="t.context" :is-checked="t.completion" @change="onChange(i)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, reactive, onBeforeMount } from '@nuxtjs/composition-api'
import { Todo } from '@/types/todo'

export default defineComponent({
  components: {
    MarkBox: () => import('@/components/common/MarkBox.vue')
  },
  props: {
    todoList: {
      type: Array as PropType<Todo[]>,
      required: false,
      default: () => []
    }
  },
  setup (props) {
    const state = reactive({
      editTodoList: [] as Todo[]
    })

    onBeforeMount(() => {
      state.editTodoList = props.todoList
    })

    const onChange = (index: number) => {
      state.editTodoList[index].completion = !state.editTodoList[index].completion
    }

    return {
      ...toRefs(state),
      onChange
    }
  }
})
</script>

<style>

</style>
