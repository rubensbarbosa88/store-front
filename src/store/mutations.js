export default {
  'SET_SNACKBAR' (state, payload) {
    state.snackbar = { ...payload }
  },
  'SET_PRODUCTS' (state, payload) {
    state.products = payload
  }
}
