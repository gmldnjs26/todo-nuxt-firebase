import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Account from '@/store/account'

/* eslint-disable import/no-mutable-exports */
let accountStore: Account

const initialiseStores = (store: Store<Object>): void => {
  accountStore = getModule(Account, store)
}

export { initialiseStores, accountStore }
