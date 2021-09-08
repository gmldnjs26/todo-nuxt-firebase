export type Todo = {
  id: string
  doDate: string
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
