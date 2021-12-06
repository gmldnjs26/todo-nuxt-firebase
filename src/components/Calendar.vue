<template>
  <div class="w-full h-full mx-4">
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
    <section class="mt-4">
      <div class="flex">
        <div v-for="(day, i) in $t('dayLabels')" :key="i" class="w-full h-3 flex items-center justify-center text-xs">
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-7 mt-2">
        <div v-for="(d, i) in dates" :key="i">
          {{ d.date | formatDateToDay }}
          {{ d.isCompletedTodoCount }}
          {{ d.isNotCompletedTodoCount }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from '@nuxtjs/composition-api'
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, eachDayOfInterval, getDay } from 'date-fns/fp'
import format from 'date-fns/format'
import { dayTodoStatusInfo } from '@/types/todo'

export default defineComponent({
  filters: {
    formatDateToDay(val: Date) {
      return format(val, 'd')
    },
  },
  props: {
    dayTodoStatusInfos: {
      type: Object as PropType<{ [key: string]: dayTodoStatusInfo }>,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const currDateCursor = ref(new Date(new Date().setHours(0, 0, 0, 0)))
    const isShowMonth = ref(false)
    console.log(props.dayTodoStatusInfos)
    const dates = computed(() => {
      const currDate = currDateCursor.value
      const startDate = isShowMonth.value ? startOfMonth(currDate) : startOfWeek(currDate)
      const endDate = isShowMonth.value ? endOfMonth(currDate) : endOfWeek(currDate)
      return eachDayOfInterval({ end: endDate, start: startDate }).map((date) => ({
        date,
        isHoliday: getDay(date) === 0,
        isSaturday: getDay(date) === 6,
        isCompletedTodoCount:
          props.dayTodoStatusInfos[format(date, 'yyyyMMdd')] !== undefined
            ? props.dayTodoStatusInfos[format(date, 'yyyyMMdd')].isCompletedTodoCount
            : 0,
        isNotCompletedTodoCount:
          props.dayTodoStatusInfos[format(date, 'yyyyMMdd')] !== undefined
            ? props.dayTodoStatusInfos[format(date, 'yyyyMMdd')].isNotCompletedTodoCount
            : 0,
      }))
    })

    return {
      dates,
    }
  },
})
</script>
