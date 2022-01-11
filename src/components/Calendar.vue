<template>
  <div class="w-full h-full mx-4">
    <section class="flex">
      <div>
        <span>{{ currDateCursor | formatDateToYYYYMM }}</span>
        <span>Completed: 5</span>
      </div>
      <div>
        <button @click="toPreviousMW">·＜·</button>
        <button @click="toNextMW">·＞·</button>
      </div>
      <div>
        <RadioGroup :radio-contents="CALENDAR_RADIO_CONTENTS" :selected-value="1" @click="(value) => changePeriod(value)" />
      </div>
    </section>
    <section class="my-6">
      <div class="grid grid-cols-7 mt-2 text-center">
        <div v-for="day in $t('dayLabels')" :key="day" class="w-full h-4 text-xs">
          {{ day }}
        </div>
        <div v-for="(d, i) in dates" :key="i" class="flex flex-col justify-center items-center">
          <span :class="d.isHoliday ? 'text-red-500' : d.isSaturday ? 'text-blue-500' : 'text-black'">{{
            d.date | formatDateToDay
          }}</span>
          <MarkIcon
            :is-checked="d.isCompletedTodoCount > 0 && d.isNotCompletedTodoCount === 0"
            :inner-text="d.isNotCompletedTodoCount ? d.isNotCompletedTodoCount.toString() : '0'"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, Ref } from '@nuxtjs/composition-api'
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, eachDayOfInterval, getDay, addMonths, addWeeks } from 'date-fns'
import format from 'date-fns/format'
import { dayTodoStatusInfo } from '@/types/todo'
import { CALENDAR_RADIO_CONTENTS } from '@/utils/const'

export default defineComponent({
  components: {
    MarkIcon: () => import('@/components/MarkIcon.vue'),
    RadioGroup: () => import('@/components/RadioGroup.vue'),
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
    const currDateCursor: Ref<Date> = ref(new Date(new Date().setHours(0, 0, 0, 0)))
    const isShowMonth: Ref<Boolean> = ref(true)
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

    const toNextMW = () => {
      currDateCursor.value = isShowMonth.value ? addMonths(currDateCursor.value, 1) : addWeeks(currDateCursor.value, 1)
    }

    const toPreviousMW = () => {
      currDateCursor.value = isShowMonth.value ? addMonths(currDateCursor.value, -1) : addWeeks(currDateCursor.value, -1)
    }

    const changePeriod = (value: number) => {
      isShowMonth.value = value === 1
    }

    return {
      dates,
      currDateCursor,
      CALENDAR_RADIO_CONTENTS,
      toNextMW,
      toPreviousMW,
      changePeriod,
    }
  },
})
</script>
