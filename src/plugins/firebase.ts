import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/analytics'
import { Plugin } from '@nuxt/types'
// import FirebaseConfigInfo from '@/config/firebaseConfig'

// const firebaseConfig = FirebaseConfigInfo

firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASURMENTID,
})

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

const $firebase = firebase
const $auth = firebase.auth()
const $db = firebase.firestore()
const $storage = firebase.storage()

const myPlugin: Plugin = (_, inject) => {
  inject('firebase', $firebase)
  inject('auth', $auth)
  inject('db', $db)
  inject('storage', $storage)
}
// vuex에서도 접근하기 위해 근데 애초에 굳이 inject안하고 import로써 쓰는것도 나쁘지 않을꺼 같드아..
export { $firebase, $auth, $db, $storage }
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
