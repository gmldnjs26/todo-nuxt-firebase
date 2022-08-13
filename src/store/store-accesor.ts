import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Account from '@/store/account'
import Guest from '@/store/guest'
import User from '@/store/user'

/* eslint-disable import/no-mutable-exports */
let accountStore: Account
let guestStore: Guest
let userStore: User

const initialiseStores = (store: Store<Object>): void => {
  accountStore = getModule(Account, store)
  guestStore = getModule(Guest, store)
  userStore = getModule(User, store)
}

export { initialiseStores, accountStore, guestStore, userStore }
