import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
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
  SET_TODOLIST = 'SET_TODOLIST',
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

  // @Mutation
  // [MutationTypes.SET_TODOLIST](todoList: Todo[]) {
  //   this.todoList = todoList
  // }
}
