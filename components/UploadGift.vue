<template>
  <v-card>
    <v-card-title class="my-5">
      آپلود فایل اکسل کد تخفیف
      <v-btn
        class="mr-5"
        small
        color="pink"
        href="/example.xlsx"
      >
        دانلود فایل نمونه
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="uploadGiftFile">
        <v-row>
          <v-col md="3" >
            <v-file-input
              v-model="form.gift_code_file"
              label="آپلود فایل اکسل"
              prepend-icon="mdi-paperclip"
              outlined
            >
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-col>
          <v-col md="2" >
            <v-btn
              type="submit"
              :loading="loading"
              color="pink"
              class="ma-2 white--text"

            >
              <v-icon
                left
                dark
              >
                mdi-cloud-upload
              </v-icon>
              آپلود
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UploadGift",

  props: {

    form:{
      type: Object,
      default: {
        gift_code_file: [],
      },
    },

    loading: {
      type: Boolean,
      default: false
    },

  },


  methods: {
    uploadGiftFile() {
      this.$emit('uploadFile')
    },

  }


}
</script>

<style scoped>

</style>
