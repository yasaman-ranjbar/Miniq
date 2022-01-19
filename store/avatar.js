export default {
  actions: {

    create({ commit }, payload) {
      let formData = new FormData();
      formData.append("name", payload.name);
      formData.append("avatar_file", payload.avatar_file);
      formData.append("is_men", payload.is_men);
      formData.append("price", payload.price);

      return this.$axios({
        url: `api/admin/avatars/create`,
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
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
        url: `api/admin/avatars/list?page=${payload.page}`,
        method: "get",
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
        url: `/api/admin/avatars/edit/${payload.id}`,
        method: "put",
        data: {
          name: payload.name,
          avatar_file: payload.avatar_file,
          is_men: payload.is_men,
          price: payload.price
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
