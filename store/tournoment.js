export default {


  actions: {
    create({commit}, payload) {
      return this.$axios({
        url: `api/admin/tournaments/create`,
        method: "post",
        data: {
          start_time: payload.start_time,
          type: payload.type,
          category_ids: payload.category_ids
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

    list({ commit} , payload) {
      return this.$axios({
        url: `api/admin/tournaments/list?page=${payload.page}`,
        method: "get"
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.result.data) {
              return res.data.result;

            }
          }
        })
        .catch(err => {
          err.message
        });
    },

    update({ commit }, payload) {
      return this.$axios({
        url: `/api/admin/tournaments/edit/${payload.id}`,
        method: "put",
        data: {
          start_time: payload.start_time,
          type: payload.type,
          category_ids: payload.category_ids
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
