import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Category, Todo } from '@/types/todo'
import { firebase } from '@/plugins/firebase'

export interface AccountState {
  email: string
  username: string
  categoryList: Array<Category>
  todoList: Array<Todo>
  createdAt: string

  // {} as { [key: number]: boolean },
}

export enum MutationTypes {
  SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO',
  SET_TODOLIST_COMPLETION = 'SET_TODOLIST_COMPLETION',
  SET_TODOLIST_CONTEXT = 'SET_TODOLIST_CONTEXT',
  SET_TODOLIST_DATE = 'SET_TODOLIST_DATE',
  SET_TODOLIST_TIME = 'SET_TODOLIST_TIME',
  REMOVE_TODOITEM = 'REMOVE_TODOITEM',
  ADD_TODOLIST = 'ADD_TODOLIST',
}

const defaultCategoryList = [
  {
    id: '1',
    userId: 'heewon',
    name: '운동',
    icon: 'walking',
    color: 'green',
    createdAt: '20211206',
  },
  {
    id: '2',
    userId: 'heewon',
    name: '공부',
    icon: 'school',
    color: 'gray',
    createdAt: '20211206',
  },
]

const defaultData: Array<Todo> = [
  {
    categoryId: '1',
    id: '1',
    userId: 'gmldnjs',
    doDate: '20211206',
    doTime: '2012',
    context: 'Test1',
    completion: false,
    createdAt: '20210830',
  },
  {
    categoryId: '1',
    id: '2',
    doDate: '20211206',
    doTime: '2012',
    context: 'Test2',
    completion: false,
    createdAt: '20210830',
    userId: 'gmldnjs',
  },
  {
    categoryId: '2',
    id: '3',
    doDate: '20211207',
    doTime: '2012',
    context: 'Test3',
    completion: false,
    createdAt: '20210830',
    userId: 'gmldnjs',
  },
]
// const savedData = JSON.parse(window.localStorage.getItem('heewon') as string)
@Module({
  name: 'account',
  // If you need to support module reuse or to use modules with NuxtJS,
  // you can have a state factory function generated instead of a static state object instance by using stateFactory
  stateFactory: true,
  namespaced: true, // can do it -> getters['account/accountInfo']
})
export default class Account extends VuexModule implements AccountState {
  email = 'guest'
  username = 'guest'
  todoList = defaultData
  categoryList = defaultCategoryList
  createdAt = '1970-01-01';

  @Mutation
  [MutationTypes.SET_ACCOUNT_INFO](accountInfo: AccountState) {
    this.email = accountInfo.email
    this.username = accountInfo.username
    this.todoList = accountInfo.todoList
    this.createdAt = accountInfo.createdAt
  }

  @Mutation
  [MutationTypes.SET_TODOLIST_COMPLETION]({ todoId, completion }: { todoId: string; completion: boolean }) {
    const target = this.todoList.find((item) => item.id === todoId)
    if (target) target.completion = completion
  }

  @Mutation
  [MutationTypes.SET_TODOLIST_CONTEXT]({ todoId, context }: { todoId: string; context: string }) {
    const target = this.todoList.find((item) => item.id === todoId)
    if (target) target.context = context
  }

  @Mutation
  [MutationTypes.ADD_TODOLIST]({ catId, date }: { catId: string; date: string }) {
    this.todoList.push({
      // FIXME: default 내용들은 로그인, 비로그인으로 나누기
      categoryId: catId,
      id: (this.todoList.length + 1).toString(),
      doDate: date,
      doTime: '0000',
      context: '할일적어줘',
      completion: false,
      createdAt: date,
      userId: 'gmldnjs',
    })
  }

  @Mutation
  [MutationTypes.REMOVE_TODOITEM](todoId: string) {
    const targetIndex = this.todoList.findIndex((item) => item.id === todoId)
    this.todoList.splice(targetIndex, 1)
  }

  @Action({ rawError: true })
  setTodolistCompletion(payload: { todoId: string; completion: boolean }) {
    this.SET_TODOLIST_COMPLETION(payload)
  }

  @Action({ rawError: true })
  setTodolistContext(payload: { todoId: string; context: string }) {
    this.SET_TODOLIST_CONTEXT(payload)
  }

  @Action({ rawError: true })
  addTodolist(payload: { catId: string; date: string }) {
    this.ADD_TODOLIST(payload)
  }

  @Action({ rawError: true })
  removeTodoItem(todoId: string) {
    this.REMOVE_TODOITEM(todoId)
  }
}
