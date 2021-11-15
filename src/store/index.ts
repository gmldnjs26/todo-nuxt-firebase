import { Store } from 'vuex'
import { initialiseStores } from './store-accesor'

const initializer = (store: Store<Object>): void => initialiseStores(store)
export const plugins = [initializer]
export * from './store-accesor'
