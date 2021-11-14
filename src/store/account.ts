import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Todo } from '@/types/todo'

interface AccountState {
  email: string
  username: string
  todoList: Todo[]
  createdAt: string
}

export enum MutationTypes {
  SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO',
  SET_TODOLIST = 'SET_TODOLIST',
}

const defaultData = [
  {
    categoryId: '1',
    id: '1',
    doDate: '20210830',
    doTime: '2012',
    context: 'Test1',
    completion: false,
    createdAt: '20210830',
    userId: 'gmldnjs',
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
  {
    categoryId: '1',
    id: '3',
    doDate: '20210830',
    doTime: '2012',
    context: 'Test3',
    completion: false,
    createdAt: '20210830',
    userId: 'gmldnjs',
  },
]

@Module({
  name: 'account',
  // If you need to support module reuse or to use modules with NuxtJS,
  // you can have a state factory function generated instead of a static state object instance by using stateFactory
  stateFactory: true,
  namespaced: true, // can do it -> getters['account/accountInfo']
})
class Account extends VuexModule implements AccountState {
  email = ''
  username = ''
  todoList = defaultData
  createdAt = '';

  @Mutation
  [MutationTypes.SET_ACCOUNT_INFO](accountInfo: AccountState) {
    this.email = accountInfo.email
    this.username = accountInfo.username
    this.todoList = accountInfo.todoList
    this.createdAt = accountInfo.createdAt
  }

  @Mutation
  [MutationTypes.SET_TODOLIST](todoList: Todo[]) {
    this.todoList = todoList
  }
}

export { Account }
