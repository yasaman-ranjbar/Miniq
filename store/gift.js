export default {
  actions: {

    create({commit}, payload) {
      return this.$axios({
        url: `api/admin/gift_codes/create`,
        method: "post",
        data: {
          company_id: payload.company_id,
          code: payload.code,
          description: payload.description,
          link : payload.link,
          expired_at: payload.expired_at
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
        url: `/api/admin/gift_codes/edit/${payload.id}`,
        method: "put",
        data: {
          id: payload.id,
          company_id: payload.company_id,
          code: payload.code,
          description: payload.description,
          link : payload.link,
          expired_at: payload.expired_at
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
        url:`/api/admin/gift_codes/list?page=${payload.page}`,
        method: 'get',
        data: {
          page: payload.page
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
  }
}
