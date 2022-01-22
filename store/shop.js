export default {
  actions: {

    create({ commit }, payload) {
      let formData = new FormData();
      formData.append("title", payload.title);
      formData.append("icon_file", payload.icon_file);
      formData.append("type", payload.type);
      formData.append("price", payload.price);
      formData.append("amount", payload.amount);
      formData.append("description", payload.description);

      return this.$axios({
        url: `api/admin/banks/create`,
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

    update({ commit }, payload) {
      let formData = new FormData();

        formData.append("title", payload.title);
        if(payload.icon_file) {
          formData.append("icon_file", payload.icon_file);
        }
        formData.append("type", payload.type);
        formData.append("price", payload.price);
        formData.append("amount", payload.amount);
        formData.append("description", payload.description);

      return this.$axios({
        url: `/api/admin/banks/edit/${payload.id}`,
        method: "put",
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
        url:`/api/admin/banks/list?page=${payload.page}`,
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

    delete() {

    }
  }
}
