export default {
  actions: {
    create({ commit }, payload) {
      let formData = new FormData();
      formData.append("voice_file", payload.voice_file);
      formData.append("name", payload.name);

      return this.$axios({
        url: `api/admin/settings/voice/create`,
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
      return this.$axios({
        url: `/api/admin/settings/voice/edit/${payload.id}`,
        method: "put",
        data: {
          voice_file: payload.voice_file
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
        url:`/api/admin/settings/voice/list?page=${payload.page}`,
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
