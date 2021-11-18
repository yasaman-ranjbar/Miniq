export default {
  state() {
    return {
      name: '',
      description: '',
      icon: ''
    }
  },

  actions: {

    create({ commit }, payload) {
      let formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("icon", payload.icon);

      return this.$axios({
        url: `api/admin/categories/create`,
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          return false;
        });
    },

    list() {
      return this.$axios({
        url: `api/admin/categories/list`,
        method: "get"
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.result.data) {
              return res.data.result.data;

            }
          }
        })
        .catch(err => {
          err.message
        });
    },

    show({ commit }, payload) {
      return this.$axios({
        url: `api/admin/categories/show/${payload.id}`,
        method: "get",
        data:{
          name: payload.name,
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

    update({ commit }, payload) {
      return this.$axios({
        url: `/api/admin/categories/edit/${payload.id}`,
        method: "get",
        data: payload,
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

    // delete({ commit }, payload) {
    //   return this.$axios({
    //     url: `/api/admin/categories/delete/${payload.id}`,
    //     method: "delete"
    //   })
    //     .then(res => {
    //       if (res.status === 200) {
    //         if (res.data.result.data) {
    //           return res.data.result.data;
    //         }
    //       }
    //     })
    //     .catch(err => { err.message });
    // },

    // categoryList() {
    //   return this.$axios({
    //     url: `api/admin/categories/list`,
    //     method: "get",
    //   })
    //     .then(res => {
    //       console.log(res)
    //       if (res.status === 200) {
    //         if (res.data) {
    //           return res.data;
    //         }
    //       }
    //     })
    //     .catch(err => { });
    // },

  }


}
