export default {
  state() {
    return {

    }
  },


  actions: {
    otp ({ commit }, payload) {
      return this.$axios({
        url: `/api/admin/otp`,
        method: "post",
        data: payload,
      }).then(res => {
        console.log(res.data.meta.status)
        if (res.data.meta.status) {
          // commit("REGISTER_USER", res.data.data);
          // this.$toast.success("کد تایید برای شما ارسال شد");
          return res.data.meta.status;
        }
        return false;
      }).catch(err => {
        // this.$toast.error("خطا رخ داده، دوباره تلاش کنید");
        return false;
      });
    },


  }
}