export type Category = {
  id: string
  userId: string
  name: string
  icon: string
  color: string
  createdAt: string
  rowNum: number
}

export type Todo = {
  id: string
  userId: string
  categoryId: string
  doDate: string
  doTime: string
  context: string
  completion: boolean
  createdAt: string
  rowNum: number
}

export type TodoEditEventInfo = {
  icon: string | Array<string>
  event: string
  title: string
}

export type EditTodo = Todo & {
  onEdit: boolean
}

export type dayTodoStatusInfo = {
  isCompletedTodoCount: number
  isNotCompletedTodoCount: number
}
