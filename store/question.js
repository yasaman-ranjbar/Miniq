export default {

  state() {
    return {
      questions:[],
    }
  },

  actions:{
    create ({ commit }, payload) {
      return this.$axios({
        url: `api/admin/questions/create`,
        method: "post",
        data: {
          text : payload.text,
          category_id: payload.category_id
        },
      })
        .then (res => {
        console.log(res.data.result)
        if (res.data.result) {
          return res.data.result;
        }
      })
        .catch(err => err.data);
    },

    show({ commit }, payload) {
      return this.$axios({
        url: `api/admin/questions/show/${payload.id}`,
        method: "get",
        data:{
          text: payload.text,
          id: payload.id
        }
      })
        .then(res => {
          if (res.data.result) {
            return res.data.result;
          }
        })
        .catch(err => {
          err.message
        });

    },
  }
}
