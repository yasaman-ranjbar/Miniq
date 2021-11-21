export default {
  state() {
    return {}
  },

  actions: {
    list({ commit }, payload) {
      return this.$axios({
        url: `api/admin/answers/list/${payload.question_id}`,
        method: "get"
      })
        .then(res => {
          console.log(res);
          if (res.data.status) {
            return res.data.result
          }
        })
        .catch(err => {
          return false;
        });
    },
  }
}
