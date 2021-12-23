import { TodoEditEventInfo } from '@/types/todo'

export const TODO_EDIT_EVENTS: TodoEditEventInfo[] = [
  {
    icon: 'edit',
    event: 'edit',
    title: '수정',
  },
  {
    icon: 'trash-alt',
    event: 'remove',
    title: '삭제',
  },
  {
    icon: ['far', 'bell'],
    event: 'alram',
    title: '시간설정',
  },
  {
    icon: ['far', 'calendar-alt'],
    event: 'changeDate',
    title: '날짜변경',
  },
]

export const CALENDAR_RADIO_CONTENTS = [
  {
    value: 1,
    text: '月',
  },
  {
    value: 2,
    text: '週',
  },
]
