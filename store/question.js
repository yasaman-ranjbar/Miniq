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
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            if (res.data.result) {
              return res.data.result;
            }
          }
        })
        .catch(err => err.data);
    },

    show({ commit }, payload) {
      return this.$axios({
        url: `api/admin/questions/show/${payload.id}`,
        method: "get",
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

    update({ commit }, payload) {
      return this.$axios({
        url: `/api/admin/questions/edit/${payload.id}`,
        method: "put",
        data: {
          text: payload.text,
          id: payload.id
        },
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            if (res.data.result) {
              return res.data.result;
            }
          }
        })
        .catch(err => {
          return false;
        });
    },
  }
}
