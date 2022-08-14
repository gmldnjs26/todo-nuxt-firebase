import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $auth, $db } from '../plugins/firebase'
import { AccountState, MutationTypes } from './type'
@Module({
  name: 'account',
  stateFactory: true,
  namespaced: true, // can do it -> getters['account/accountInfo']
})
export default class Account extends VuexModule implements AccountState {
  email = ''
  username = ''
  isAuthenticated = false;

  @Mutation
  [MutationTypes.SET_ACCOUNT_INFO](accountInfo: AccountState) {
    this.email = accountInfo.email
    this.username = accountInfo.username
    this.isAuthenticated = true
  }

  @Mutation
  [MutationTypes.SET_AUTH](payload: boolean) {
    this.isAuthenticated = payload
  }

  @Action({ rawError: true })
  onLogin(payload: { email: string; password: string }) {
    // TODO: login
  }

  @Action({ rawError: true })
  onLogout() {
    // TODO: logout
  }
}
