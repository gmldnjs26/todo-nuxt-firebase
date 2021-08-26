<template>
  <div>
    TodoList
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Todo = {
  doDate: string
  context: string
  completion: boolean
  createdAt: string
  userId: string
}

export default defineComponent({
  props: {
    todoList: {
      type: Array as PropType<Todo[]>,
      required: false,
      default: () => []
    }
  },
  setup (_, context) {
    console.log(context)
  }
})
</script>

<style>

</style>
