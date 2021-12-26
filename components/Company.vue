<template>
  <v-card>
    <v-card-title>
      افزودن کمپانی
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="createCompany">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="نام کمپانی"
              outlined
              v-model="form.name"
              color="primary"
            >
            </v-text-field>
            <v-text-field
              label="لینک وب سایت"
              outlined
              v-model="form.link"
              color="primary"
            >
            </v-text-field>
            <v-text-field
              label="توضیحات"
              outlined
              v-model="form.description"
              color="primary"
            >
            </v-text-field>

          </v-col>
        </v-row>
        <v-btn
          :loading="loading"
          type="submit"
          color="pink"
        >
          {{ edit ? editBtn : addBtn}}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Company",

  props: {

    form: {
      // type: Object,
      // default: {
      //   name: '',
      //   link: '',
      //   description: '',
      // },
    },

    loading: false,
    edit: false,
  },

  data() {
    return {
      editBtn: "ویرایش",
      addBtn: "افزودن"
    }
  },

  methods: {
    createCompany() {
      this.$emit('addCompany')
    }
  }
}
</script>

<style scoped>

</style>
