import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
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
  }

  @Action({ rawError: true })
  onLogin(payload: { email: string; password: string }) {
    // TODO: login
    console.log(payload)
  }

  @Action({ rawError: true })
  onLogout() {
    // TODO: logout
  }
}
