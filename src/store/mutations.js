export default {
  'SET_SNACKBAR' (state, payload) {
    state.snackbar = { ...payload }
  },
  'SET_PRODUCTS' (state, payload) {
    state.products = payload
  },
  'SET_INCOMING_PRODUCTS' (state, payload) {
    state.incomingProducts = payload
  },
  'SET_INVENTORY' (state, payload) {
    state.inventory = payload
  }
}
