<template>
  <v-card>
    <v-card-title class="my-5">
     آپلود فایل
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
      <v-form @submit.prevent="uploadQuestion">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="form.value"
              :items="form.item"
              item-text="name"
              item-value="id"
              label="دسته بندی"
              outlined
            >
              <template #selection="{ item }">
                <v-chip color="pink">{{item.name}}</v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col md="3" >
            <v-file-input
              v-model="form.question_file"
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

  props: {

    form:{
      type: Object,
        default: {
            value : [],
            item: [],
            question_file: [],
        },
    },

    loading: {
      type: Boolean,
      default: false
    },

  },


  methods: {
    uploadQuestion() {
      this.$emit('uploadFile')
    },

  }
}
</script>

<style>

</style>
