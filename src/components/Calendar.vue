<template>
  <div class="w-full h-full mx-4">
    <section class="flex">
      <div>
        <span>{{ currDateCursor | formatDateToYYYYMM }}</span>
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
    <section class="my-6">
      <div class="flex">
        <div v-for="(day, i) in $t('dayLabels')" :key="i" class="w-full h-3 flex items-center justify-center text-xs">
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-7 mt-2">
        <div v-for="(d, i) in dates" :key="i">
          <span :class="d.isHoliday ? 'text-red-500' : d.isSaturday ? 'text-blue-500' : 'text-black'">{{
            d.date | formatDateToDay
          }}</span>
          <MarkIcon
            class="relative"
            :is-checked="d.isCompletedTodoCount > 0 && d.isNotCompletedTodoCount === 0"
            :inner-text="d.isNotCompletedTodoCount ? d.isNotCompletedTodoCount.toString() : '0'"
          />
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
  components: {
    MarkIcon: () => import('@/components/MarkIcon.vue'),
  },
  filters: {
    formatDateToDay(val: Date) {
      return format(val, 'd')
    },
    formatDateToYYYYMM(val: Date) {
      return format(val, 'yyyy-MM')
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
    const dates = computed(() => {
      const currDate = currDateCursor.value
      const startDate = isShowMonth.value ? startOfMonth(currDate) : startOfWeek(currDate)
      const endDate = isShowMonth.value ? endOfMonth(currDate) : endOfWeek(currDate)
      return eachDayOfInterval({ end: endDate, start: startDate }).map((date) => ({
        date,
        isHoliday: getDay(date) === 0,
        isSaturday: getDay(date) === 6,
        isCompletedTodoCount: props.dayTodoStatusInfos[format(date, 'yyyyMMdd')]
          ? props.dayTodoStatusInfos[format(date, 'yyyyMMdd')].isCompletedTodoCount
          : 0,
        isNotCompletedTodoCount: props.dayTodoStatusInfos[format(date, 'yyyyMMdd')]
          ? props.dayTodoStatusInfos[format(date, 'yyyyMMdd')].isNotCompletedTodoCount
          : 0,
      }))
    })

    return {
      dates,
      currDateCursor,
    }
  },
})
</script>
