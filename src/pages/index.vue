<template>
  <div class="bg-white h-[350px]">
    <font-awesome-layers class="fa-4x">
      <font-awesome-icon icon="download" />
    </font-awesome-layers>
    This is Index Page
    <font-awesome-icon class="fa-x text-blue-900" icon="star" />
    <TodoList />
    <MarkBox :is-checked="isChecked" label="testtext" @change="onChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    TodoList: () => import('@/components/TodoList.vue'),
    MarkBox: () => import('@/components/common/MarkBox.vue')
  },
  setup (props, context) {
    console.log(props, context)
    const isChecked = ref(false)

    const onChange = (checked: boolean) => {
      isChecked.value = checked
    }

    return {
      onChange,
      isChecked
    }
  }
})

</script>
