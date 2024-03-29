<template>
  <div class="w-full h-full px-1">
    <section class="flex justify-between">
      <div class="flex items-center justify-center">
        <span class="font-bold text-xl mr-2">{{ currDateCursor | formatDateToYYYYMM }}</span>
        <div class="flex">
          <MarkIcon v-show="isCompletedCountOfCurrentMonth > 0" class="scale-75" :is-checked="true" />
          <span v-show="isCompletedCountOfCurrentMonth > 0" class="text-sm pt-[2px]"> {{ isCompletedCountOfCurrentMonth }}</span>
        </div>
      </div>
      <div class="flex space-x-4">
        <button @click="toPrevMW">
          <font-awesome-icon class="text-base cursor-pointer" icon="chevron-left" />
        </button>
        <button @click="toNextMW">
          <font-awesome-icon class="text-base cursor-pointer" icon="chevron-right" />
        </button>
        <SwitchButton
          :items="CALENDAR_RADIO_CONTENTS"
          :selected-value="selectedPeriodVal"
          @onChange="(value) => changePeriod(value)"
        />
        <!-- <RadioGroup
          :radio-contents="CALENDAR_RADIO_CONTENTS"
          :selected-value="selectedPeriodVal"
          @click="(value) => changePeriod(value)"
        /> -->
      </div>
    </section>
    <section class="my-6">
      <transition :name="transitionName">
        <div v-show="!isLoading" class="grid grid-cols-7 gap-2 mt-2 text-center">
          <div v-for="day in $t('dayLabels')" :key="day" class="w-full h-4 text-xs">
            {{ day }}
          </div>
          <div
            v-for="(d, i) in dates"
            :key="i"
            class="flex flex-col justify-center items-center cursor-pointer transition-all"
            :class="[d.isSelectedDay ? 'drop-shadow-lg scale-150' : 'p-1', !d.isCurrMonth ? 'opacity-30' : '']"
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
      </transition>
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
  isSameMonth,
  addDays,
} from 'date-fns'
import format from 'date-fns/format'
import { dayTodoStatusInfo } from '@/types/todo'
import { CALENDAR_RADIO_CONTENTS } from '@/utils/const'

import { DateCellInfo } from '~/types/calendar'

export default defineComponent({
  components: {
    MarkIcon: () => import('@/components/MarkIcon.vue'),
    // RadioGroup: () => import('@/components/RadioGroup.vue'),
    SwitchButton: () => import('@/components/SwitchButton.vue'),
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
    const isShowMonth: Ref<Boolean> = ref(true)

    const dates = computed<DateCellInfo[]>(() => {
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
        isCompletedTodoCount: props.dayTodoStatusInfos[format(date, 'yyyy-MM-dd')]
          ? props.dayTodoStatusInfos[format(date, 'yyyy-MM-dd')].isCompletedTodoCount
          : 0,
        isNotCompletedTodoCount: props.dayTodoStatusInfos[format(date, 'yyyy-MM-dd')]
          ? props.dayTodoStatusInfos[format(date, 'yyyy-MM-dd')].isNotCompletedTodoCount
          : 0,
        isSelectedDay: isSameDay(date, currDate),
        isCurrMonth: isSameMonth(date, currDate),
      }))
    })

    const toNextMW = () => {
      onSelectDate(isShowMonth.value ? addMonths(currDateCursor.value, 1) : addWeeks(currDateCursor.value, 1))
      transitionHandler('right')
    }

    const toPrevMW = () => {
      onSelectDate(isShowMonth.value ? addMonths(currDateCursor.value, -1) : addWeeks(currDateCursor.value, -1))
      transitionHandler('left')
    }

    const isLoading: Ref<Boolean> = ref(false)
    const transitionName: Ref<String> = ref('')
    const transitionHandler = (name: string) => {
      transitionName.value = name
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
      })
    }

    const selectedPeriodVal: Ref<Number> = ref(1)
    const changePeriod = (value: number) => {
      selectedPeriodVal.value = value
      isShowMonth.value = value === 1
    }

    const onSelectDate = (value: Date) => {
      currDateCursor.value = value
      emit('onSelectDate', value)
    }

    const isCompletedCountOfSelectedDay = computed(
      (): Number => {
        if (props.dayTodoStatusInfos[format(currDateCursor.value, 'yyyy-MM-dd')] !== undefined) {
          return props.dayTodoStatusInfos[format(currDateCursor.value, 'yyyy-MM-dd')].isCompletedTodoCount
        } else {
          return 0
        }
      },
    )
    const isCompletedCountOfCurrentMonth = computed(
      (): Number => {
        let sum = 0
        Object.keys(props.dayTodoStatusInfos).forEach((key) => {
          console.log(key, currDateCursor.value)
          if (isSameMonth(new Date(key), currDateCursor.value)) sum += props.dayTodoStatusInfos[key].isCompletedTodoCount
        })
        return sum
      },
    )

    return {
      isShowMonth,
      dates,
      currDateCursor,
      CALENDAR_RADIO_CONTENTS,
      toNextMW,
      toPrevMW,
      changePeriod,
      onSelectDate,
      isLoading,
      transitionName,
      selectedPeriodVal,
      isCompletedCountOfSelectedDay,
      isCompletedCountOfCurrentMonth,
    }
  },
})
</script>

<style scoped>
.right-enter-active,
.right-leave-active {
  transform: translate(0px, 0px);
  transition: transform 500ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.right-enter,
.right-leave-to {
  transform: translateX(20vw) translateX(0px);
}
.left-enter-active,
.left-leave-active {
  transform: translate(0px, 0px);
  transition: transform 500ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.left-enter,
.left-leave-to {
  transform: translateX(-20vw) translateX(0px);
}
</style>
