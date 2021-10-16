import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/analytics'
import { Plugin } from '@nuxt/types'

const firebaseConfig = {
  apiKey: 'AIzaSyC-s98DtWSmAWU8L1l1pU0K6QJlVAu3hwU',
  authDomain: 'todo-scheduler-55d15.firebaseapp.com',
  projectId: 'todo-scheduler-55d15',
  storageBucket: 'todo-scheduler-55d15.appspot.com',
  messagingSenderId: '925297734363',
  appId: '1:925297734363:web:8f9048342c92cdaeebd2fe',
  measurementId: 'G-MKYBKXC8SN',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App
    $auth: firebase.auth.Auth
    $db: firebase.firestore.Firestore
    $storage: firebase.storage.Storage
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $firebase: firebase.app.App
    $auth: firebase.auth.Auth
    $db: firebase.firestore.Firestore
    $storage: firebase.storage.Storage
  }
}

// declare module 'vuex/types/index' {
//   interface Store<S> {
//     $firebase: firebase.app.App
//     $auth: firebase.auth.Auth
//     $db: firebase.firestore.Firestore
//     $storage: firebase.storage.Storage
//   }
// }

const myPlugin: Plugin = (_, inject) => {
  inject('firebase', firebase)
  inject('auth', firebase.auth())
  inject('db', firebase.firestore())
  inject('storage', firebase.storage())
}

export default myPlugin

// declare module '@nuxt/types' {
//   interface Context {
//     $fb: {
//       auth: Firebase.auth.Auth
//       db: Firebase.firestore.Firestore
//     }
//   }
// }

// // ここでインジェクション
// const myPlugin: Plugin = (context) => {
//   context.$fb = {
//     auth: Firebase.auth,
//     db: Firebase.firestore,
//   }
// }
