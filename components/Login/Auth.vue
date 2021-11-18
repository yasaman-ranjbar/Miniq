<template>
  <div>
    <v-form @submit.prevent="submit" v-model="valid">
      <!-- <div class="mb-3">
        <span
          class="cursor-pointer"
          @click="editNumber"
          v-if="isActivationCodeSend"
          >{{ editMobileText }}</span
        >
      </div> -->

      <v-text-field
        color="#ff3392"
        label="شماره موبایل"
        required
        outlined
        dense
        v-model="form.mobile"
      >
      </v-text-field>
      <v-text-field
        v-if="isSendOtp"
        color="#ff3392"
        label="کد تایید"
        required
        outlined
        dense
        v-model="form.verifyCode"
      >
      </v-text-field>

      <div class="mt-3">
        <v-btn
          :disabled="!valid"
          block
          type="submit"
          color="#ff3392"
          :loading="loading"
        >
          {{ isSendOtp ? `${btnVerify}` : `${btnSubmit}` }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {

  props:{
    form: {
      type: Object,
      default: {
        mobile: "",
        verifyCode: "",
      },
    },
    isSendOtp: {
      type: Boolean,
      default: false,
    },
    loading:{
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      valid: false,
      btnSubmit: 'ارسال کد تایید',
      btnVerify: 'ورود',
    }
  },
  methods: {

    submit() {

        if (this.isSendOtp == false) {
          this.$emit("otp");
        } else {
          this.$emit("otpLogin");
        }

    },


    },

};
</script>
