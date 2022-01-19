<template>
  <v-card>
    <v-card-title>
      ارسال پیام به کاربران
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="createNotification">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="عنوان"
              outlined
              v-model="form.title"
              color="primary"
            >
            </v-text-field>
            <v-textarea
              outlined
              name="input-7-4"
              label="توضیحات"
              v-model="form.body"
            ></v-textarea>

          </v-col>
        </v-row>

        <v-btn
          :loading="loading"
          type="submit"
          color="pink"
        >
          ثبت
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Notification",
  props: {
    form: {},
    loading: false,
  },

  methods: {
    createNotification() {
      this.$emit('addNotification')
    }
  }
}
</script>

<style scoped>

</style>
