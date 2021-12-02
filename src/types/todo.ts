export type Category = {
  id: string
  userId: string
  name: string
  icon: string
  color: string
  createdAt: string
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
}

export type TodoEditEventInfo = {
  icon: string | Array<string>
  event: string
  title: string
}

export type EditTodo = Todo & {
  onEdit: boolean
}
