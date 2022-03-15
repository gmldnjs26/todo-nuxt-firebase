<template>
  <div class="w-full h-full mx-4">
    <section class="flex justify-between">
      <div>
        <span class="font-bold text-lg">{{ currDateCursor | formatDateToYYYYMM }}</span>
        <span>Completed: {{ isCompletedCountOfSelectedDay }}</span>
      </div>
      <div class="flex space-x-3">
        <button @click="toPreviousMW">
          <font-awesome-icon class="text-base cursor-pointer" icon="chevron-left" />
        </button>
        <button @click="toNextMW">
          <font-awesome-icon class="text-base cursor-pointer" icon="chevron-right" />
        </button>
        <RadioGroup :radio-contents="CALENDAR_RADIO_CONTENTS" :selected-value="1" @click="(value) => changePeriod(value)" />
      </div>
    </section>
    <section class="my-6">
      <div class="grid grid-cols-7 gap-2 mt-2 text-center">
        <div v-for="day in $t('dayLabels')" :key="day" class="w-full h-4 text-xs">
          {{ day }}
        </div>
        <div
          v-for="(d, i) in dates"
          :key="i"
          class="flex flex-col justify-center items-center cursor-pointer"
          :class="d.isSelectedDay ? 'border-2 border-solid border-black rounded-md' : 'p-1'"
          @click="onSelectDate(d.date)"
        >
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
import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  getDay,
  addMonths,
  addWeeks,
  isSameDay,
  addDays,
} from 'date-fns'
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
  emits: ['onSelectDate'],
  setup(props, { emit }) {
    const currDateCursor = ref(new Date(new Date().setHours(0, 0, 0, 0))) as Ref<Date>
    const isShowMonth = ref(true) as Ref<Boolean>

    const dates = computed(() => {
      const currDate = currDateCursor.value
      let startDate = isShowMonth.value ? startOfMonth(currDate) : startOfWeek(currDate)
      let endDate = isShowMonth.value ? endOfMonth(currDate) : endOfWeek(currDate)
      const daysNeededForLastMonth = getDay(startDate)
      const daysNeededForNextMonth = 6 - getDay(endDate)
      startDate = addDays(startDate, -daysNeededForLastMonth)
      endDate = addDays(endDate, daysNeededForNextMonth)
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
        isSelectedDay: isSameDay(date, currDate),
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

    const onSelectDate = (value: Date) => {
      currDateCursor.value = value
      emit('onSelectDate', value)
    }

    const isCompletedCountOfSelectedDay = computed(
      (): Number => {
        if (props.dayTodoStatusInfos[format(currDateCursor.value, 'yyyyMMdd')] !== undefined) {
          return props.dayTodoStatusInfos[format(currDateCursor.value, 'yyyyMMdd')].isCompletedTodoCount
        } else {
          return 0
        }
      },
    )

    return {
      isShowMonth,
      dates,
      currDateCursor,
      CALENDAR_RADIO_CONTENTS,
      toNextMW,
      toPreviousMW,
      changePeriod,
      onSelectDate,
      isCompletedCountOfSelectedDay,
    }
  },
})
</script>
