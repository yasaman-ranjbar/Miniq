export default {
  state() {
    return {}
  },

  actions: {
    list({ commit }, payload) {
      return this.$axios({
        url: `api/admin/answers/list/${payload.question_id}`,
        method: "get"
      })
        .then(res => {
          if (res.data.status) {
            return res.data.result
          }
        })
        .catch(err => {
          return false;
        });
    },

    create({ commit }, payload) {
      let formData = new FormData();
      formData.append("text", payload.text);
      formData.append("is_correct", payload.is_correct)

      return this.$axios({
        url: `api/admin/answers/create/${payload.Question_Id}`,
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
        url: `/api/admin/answers/edit/${payload.Question_Id}/${payload.id}`,
        method: "put",
        data: {
          text: payload.text,
          id: payload.id,
          Question_Id: payload.Question_Id,
          is_correct : payload.is_correct,
          voice_file: payload.voice_file,
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
