import Vue from 'vue'

export default {
  async getProducts ({ commit, state }, products) {
    try {
      const response = await Vue.$http.get('/products')
      commit('SET_PRODUCTS', response.data)

      return response.data
    } catch (err) {
      commit('SET_SNACKBAR', {
        open: true,
        error: true,
        message: err?.response?.data?.message || err.message
      })

      throw err
    }
  },

  async saveProduct ({ commit, state }, product) {
    try {
      const response = await Vue.$http.post('/products', product)

      return response.data
    } catch (err) {
      commit('SET_SNACKBAR', {
        open: true,
        error: true,
        message: err?.response?.data?.message || err.message
      })

      throw err
    }
  }
}
