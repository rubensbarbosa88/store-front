import Vue from 'vue'

export default {
  async getProducts ({ commit, state }, products) {
    try {
      const response = await Vue.$http.get('/products')
      commit('SET_PRODUCTS', response.data)

      return response.data
    } catch (err) {
      console.log(err)
    }
  }
}
