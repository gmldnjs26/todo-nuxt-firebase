import { TodoEditEventInfo } from '@/types/todo'

export const TODO_EDIT_EVENTS: TodoEditEventInfo[] = [
  {
    icon: 'edit',
    event: 'edit',
    title: '수정',
  },
  {
    icon: 'trash-alt',
    event: 'delete',
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
