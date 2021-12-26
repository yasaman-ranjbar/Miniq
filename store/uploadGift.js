export default {

  actions: {
    create({ commit }, payload) {
      let formData = new FormData();
      formData.append("gift_code_file", payload.gift_code_file);

      return this.$axios({
        url: `api/admin/gift_codes/import`,
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
