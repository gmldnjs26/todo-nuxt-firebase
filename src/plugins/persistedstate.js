import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) {
    return
  }
  if (process.client) {
    // https://nuxtjs.org/docs/concepts/context-helpers/#onnuxtready-helper
    window.onNuxtReady(() => {
      createPersistedState({
        key: 'guest',
        paths: ['guest'], // store/account.ts
      })(store)
    })
  }
}
