export default {

  
    actions: {
        create({commit}, payload) {
            return this.$axios({
              url: `api/admin/settings/set_app_version`,
              method: "post",
              data: {
                version_code: payload.version_code,
                is_force: payload.is_force,
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


      list({ commit }, payload) {
        return this.$axios({
          url: `api/admin/settings/get_app_version`,
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

    }
}