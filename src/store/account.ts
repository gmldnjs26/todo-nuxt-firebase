import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Todo } from '@/types/todo'

interface AccountState {
  email: string
  password: string
  username: string
  todoList: Todo[]
  createdAt: Date
}

@Module({
  name: 'account',
  stateFactory: true, // ?
  namespaced: true, // ?
})
class Account extends VuexModule implements AccountState {
  email: string = ''
  password: string = ''
  username: string = ''
  todoList: Todo[] = []
  createdAt: Date = new Date('1970/1/1')

  get accountInfo() {
    return ''
  }

  @Mutation
  setAccountInfo(accountInfo: AccountState) {
    this.email = accountInfo.email
  }
}

export { Account }
