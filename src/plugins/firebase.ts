import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/analytics'
import { Plugin } from '@nuxt/types'
// import FirebaseConfigInfo from '@/config/firebaseConfig'

// const firebaseConfig = FirebaseConfigInfo

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  })
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
