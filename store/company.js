export default {
  actions: {

    create({commit}, payload) {
      return this.$axios({
        url: `api/admin/companies/create`,
        method: "post",
        data: {
          name: payload.name,
          link: payload.link,
          description: payload.description
        },
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.result) {
              return res.data.result;
            }
          }
        })
        .catch(err => err.data);
    },

    update({ commit }, payload) {
      return this.$axios({
        url: `/api/admin/companies/edit/${payload.id}`,
        method: "put",
        data: {
          id: payload.id,
          name: payload.name,
          link: payload.link,
          description: payload.description
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


    list({ commit} , payload) {
      return this.$axios({
        url:`/api/admin/companies/list?page=${payload.page}`,
        method: 'get',
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
  }
}
