export default {

  state() {
    return {
    }
  },

  actions:{
    create({ commit }, payload) {
      let formData = new FormData();
      formData.append("text", payload.text);
      formData.append("category_id", payload.category_id);
      if(payload.voice_file) {
        formData.append("voice_file", payload.voice_file);
      }

      return this.$axios({
        url: `api/admin/questions/create`,
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
        url:`/api/admin/questions/list/category/${payload.category_id}?page=${payload.page}`,
        method: 'get',
        data: {
          category_id : payload.category_id,
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
      let formData = new FormData();
      formData.append("text", payload.text);
      formData.append("category_id", payload.category_id);
      
      if(payload.voice_file) {
        formData.append("voice_file", payload.voice_file);
      }

      return this.$axios({
        url: `/api/admin/questions/edit/${payload.id}`,
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
  }
}
