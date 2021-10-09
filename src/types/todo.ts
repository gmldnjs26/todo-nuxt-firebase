export type Category = {
  id: string
  icon: string
  color: string
}

export type Todo = {
  categoryId: string
  id: string
  doDate: string
  doTime: string
  context: string
  completion: boolean
  createdAt: string
  userId: string
}

export type TodoEditEventInfo = {
  icon: string
  event: string
  title: string
}

export type EditTodo = Todo & {
  onEdit: boolean
}
