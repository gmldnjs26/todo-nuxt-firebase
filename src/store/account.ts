import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Category, Todo } from '@/types/todo'

export interface AccountState {
  email: string
  username: string
  categoryList: Array<Category>
  todoList: { [key: string]: Array<Todo> }
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

const defaultData: { [key: string]: Array<Todo> } = {
  '1': [
    {
      id: '1',
      userId: 'gmldnjs',
      categoryId: '1',
      doDate: '20210830',
      doTime: '2012',
      context: 'Test1',
      completion: false,
      createdAt: '20210830',
    },
    {
      categoryId: '1',
      id: '2',
      doDate: '20210830',
      doTime: '2012',
      context: 'Test2',
      completion: false,
      createdAt: '20210830',
      userId: 'gmldnjs',
    },
  ],
  '2': [
    {
      categoryId: '2',
      id: '3',
      doDate: '20210830',
      doTime: '2012',
      context: 'Test3',
      completion: false,
      createdAt: '20210830',
      userId: 'gmldnjs',
    },
  ],
}
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
  categoryList = [] as Category[]
  createdAt = '1970-01-01';

  @Mutation
  [MutationTypes.SET_ACCOUNT_INFO](accountInfo: AccountState) {
    this.email = accountInfo.email
    this.username = accountInfo.username
    this.todoList = accountInfo.todoList
    this.createdAt = accountInfo.createdAt
  }

  @Mutation
  [MutationTypes.SET_TODOLIST_COMPLETION]({ catId, index, completion }: { catId: string; index: number; completion: boolean }) {
    this.todoList[catId][index].completion = completion
  }

  @Mutation
  [MutationTypes.SET_TODOLIST_CONTEXT]({ catId, index, context }: { catId: string; index: number; context: string }) {
    this.todoList[catId][index].context = context
  }

  @Mutation
  [MutationTypes.ADD_TODOLIST](catId: string) {
    this.todoList[catId].push({
      categoryId: '1',
      id: (this.todoList[catId].length + 2).toString(),
      doDate: '20210830',
      doTime: '2012',
      context: 'Test3',
      completion: false,
      createdAt: '20210830',
      userId: 'gmldnjs',
    })
  }

  @Mutation
  [MutationTypes.REMOVE_TODOITEM]({ catId, index }: { catId: string; index: number }) {
    this.todoList[catId].splice(index, 1)
  }

  @Action({ rawError: true })
  setTodolistCompletion(payload: { catId: string; index: number; completion: boolean }) {
    this.SET_TODOLIST_COMPLETION(payload)
  }

  @Action({ rawError: true })
  setTodolistContext(payload: { catId: string; index: number; context: string }) {
    this.SET_TODOLIST_CONTEXT(payload)
  }

  @Action({ rawError: true })
  addTodolist(payload: string) {
    this.ADD_TODOLIST(payload)
  }

  @Action({ rawError: true })
  removeTodoItem(payload: { catId: string; index: number }) {
    this.REMOVE_TODOITEM(payload)
  }
}
