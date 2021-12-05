<template>
  <div class="w-full h-full">
    <section class="flex">
      <div>
        <span>2021년 12월</span>
        <span>Completed: 5</span>
      </div>
      <div>
        <button>·＜·</button>
        <button>·＞·</button>
      </div>
      <div>
        <button>월</button>
      </div>
    </section>
    <section>
      <div class="flex">
        <div v-for="(day, i) in $t('dayLabels')" :key="i">
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-7 mt-2">
        <div v-for="(d, i) in dates" :key="i">
          {{ d.date | formatDateToDay }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from '@nuxtjs/composition-api'
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, eachDayOfInterval, getDay } from 'date-fns/fp'
import format from 'date-fns/format'
import { Todo } from 'types/todo'

export default defineComponent({
  filters: {
    formatDateToDay(val: Date) {
      return format(val, 'd')
    },
  },
  props: {
    todoList: {
      type: Object as PropType<{ [key: string]: Array<Todo> }>,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const currDateCursor = ref(new Date(new Date().setHours(0, 0, 0, 0)))
    const isShowMonth = ref(false)

    const dates = computed(() => {
      const currDate = currDateCursor.value
      const startDate = isShowMonth.value ? startOfMonth(currDate) : startOfWeek(currDate)
      const endDate = isShowMonth.value ? endOfMonth(currDate) : endOfWeek(currDate)
      return eachDayOfInterval({ end: endDate, start: startDate }).map((date) => ({
        date,
        isHoliday: getDay(date) === 0,
        isSaturday: getDay(date) === 6,
      }))
    })

    return {
      dates,
    }
  },
})
</script>
