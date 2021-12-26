<template>
<div>
  <UploadGift
    :loading="loading"
    :form="form"
    @uploadFile="uploadFile"
  />
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    absolute
    centered
    top
    color="green darken-1"
  >
    عملیات شما با موفقیت انجام شد

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        بستن
      </v-btn>
    </template>
  </v-snackbar>
</div>
</template>

<script>
import UploadGift from "~/components/UploadGift";
export default {
  name: "upload",
  components: {UploadGift},

  data() {
    return {
      snackbar: false,
      timeout: 3000,

      form:{
        gift_code_file: [],
      },
      loading:false,
    }
  },

  methods: {
    uploadFile() {
      this.loading = true;
      this.$store.dispatch('uploadGift/create', {
        gift_code_file: this.form.gift_code_file
      })
        .then(res => {
          this.snackbar = true;
        })
      this.loading = false

    },
  }
}
</script>

<style scoped>

</style>
