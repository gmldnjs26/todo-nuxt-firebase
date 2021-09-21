import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Todo } from '@/types/todo'

interface AccountState {
  email: string
  password: string
  username: string
  todoList: Todo[]
  createdAt: string
}

@Module({
  name: 'account',
  // If you need to support module reuse or to use modules with NuxtJS,
  // you can have a state factory function generated instead of a static state object instance by using stateFactory
  stateFactory: true,
  namespaced: true, // can do it -> getters['account/accountInfo']
})
class Account extends VuexModule implements AccountState {
  email = ''
  password = ''
  username = ''
  todoList = []
  createdAt = ''

  get accountInfo() {
    return ''
  }

  @Mutation
  setAccountInfo(accountInfo: AccountState) {
    this.email = accountInfo.email
  }
}

export { Account }