export default {


  actions: {
    create({ commit }, payload) {
      let formData = new FormData();
      // formData.append("category_ids", payload.category_ids);
      formData.append("question_file", payload.question_file);

      return this.$axios({
        url: `api/admin/questions/import/${payload.category_ids}`,
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
  }
}
