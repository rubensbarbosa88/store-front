import Vue from 'vue'

export default {
  async getProducts ({ commit }) {
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

      return []
    }
  },

  async createProduct ({ commit }, product) {
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
  },

  async deleteProduct ({ commit }, id) {
    try {
      const response = await Vue.$http.delete(`/products/${id}`)

      return response.data
    } catch (err) {
      commit('SET_SNACKBAR', {
        open: true,
        error: true,
        message: err?.response?.data?.message || err.message
      })

      return {}
    }
  },

  async getIncomingProducts ({ commit }) {
    try {
      const response = await Vue.$http.get('/incoming-products')
      commit('SET_INCOMING_PRODUCTS', response.data)

      return response.data
    } catch (err) {
      commit('SET_SNACKBAR', {
        open: true,
        error: true,
        message: err?.response?.data?.message || err.message
      })

      return {}
    }
  },

  async saveIncomingProduct ({ commit }, incomingProduct) {
    try {
      const response = await Vue.$http.post('/incoming-products', incomingProduct)

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

  async getInventory ({ commit }) {
    try {
      const response = await Vue.$http.get('/inventory')
      commit('SET_INVENTORY', response.data)

      return response.data
    } catch (err) {
      commit('SET_SNACKBAR', {
        open: true,
        error: true,
        message: err?.response?.data?.message || err.message
      })

      return []
    }
  }
}
