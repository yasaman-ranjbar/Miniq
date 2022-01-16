export default {
  state() {
    return {

    }
  },


  actions: {
    otp ({ commit }, payload) {
      return this.$axios({
        url: `/api/admin/otp`,
        method: "post",
        data: payload,
      }).then(res => {
        // console.log(res)
      })
    },


  }
}
