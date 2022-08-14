import { Category, Todo } from '@/types/todo'

export interface AccountState {
  email: string
  username: string
  isAuthenticated: boolean
}

export interface UserState {
  categoryList: Array<Category>
  todoList: Array<Todo>
  createdAt: string
}

export enum MutationTypes {
  SET_AUTH = 'SET_AUTH',
  SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO',
  SET_TODOLIST_COMPLETION = 'SET_TODOLIST_COMPLETION',
  SET_TODOLIST_CONTEXT = 'SET_TODOLIST_CONTEXT',
  SET_TODOLIST_DATE = 'SET_TODOLIST_DATE',
  SET_TODOLIST_TIME = 'SET_TODOLIST_TIME',
  REMOVE_TODOITEM = 'REMOVE_TODOITEM',
  ADD_TODOLIST = 'ADD_TODOLIST',
}
