export default {
  state(){
    return {

    }
  },

  actions: {
    list({ commit} , payload) {
      return this.$axios({
        url:`/api/admin/users/list?page=${payload.page}`,
        method: 'get',
        data: {
          id : payload.id,
          fullname: payload.fullname,
          mobile: payload.mobile,
          rank: payload.rank,
          elixir: payload.elixir,
          gem: payload.gem
        }
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
        url: `/api/admin/users/edit/${payload.id}`,
        method: "put",
        data: {
          fullname: payload.fullname,
          mobile: payload.mobile,
        },
      })
        .then(res => {
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
