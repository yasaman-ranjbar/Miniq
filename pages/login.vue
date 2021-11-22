<template>
    <div>
    <v-card class="elevation-1 px-5 py-10"
    >
      <v-card-text>
        <div class="layout column align-center">
          <img src="~/assets/images/logo.jpg" width="150" />
          <!-- <h2 class="flex pt-5">MobEx</h2> -->
        </div>
        <div class="mt-15">
            <Auth
              :form="form"
              :loading="loading"
              :isSendOtp="isSendOtp"
              @otp="otp"
              @otpLogin="mobileVerify"
            />
        </div>
      </v-card-text>
    </v-card>
    </div>
</template>

<script>
import Auth from '@/components/Login/Auth'
export default {
  components: { Auth },
  layout: "login",
  data() {
    return {
      isSendOtp: false,
      // callCountDownTimer: false,
      loading: false,
      form: {
        mobile: "",
        verifyCode: "",
      }
    };
  },
  methods: {
    otp() {
      this.loading = true;
      this.isSendOtp = true;
      this.$store
        .dispatch("otp/otp", {
          mobile: this.form.mobile
        })
        
        .then(res => {
          if (res) {
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
    },

    async mobileVerify() {
      this.loading = true;
      await this.$auth
        .loginWith("local", {
          data: {
            mobile: this.form.mobile,
            code: this.form.verifyCode
          }
        })
        .then(res => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
      },
    },
};
</script>

<style>

</style>
