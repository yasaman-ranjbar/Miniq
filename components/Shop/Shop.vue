<template>
  <v-card>
    <v-card-title>
      فروشگاه
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="createPremiumAvatar">
        <v-row>
          <v-col
            md="4"
            sm="12"
          >
            <v-text-field
              label="عنوان"
              outlined
              v-model="form.title"
              color="primary"
            >
            </v-text-field>
            <v-file-input
              label="آپلود آواتار"
              v-model="form.icon_file"
              prepend-icon="mdi-camera"
              outlined
            ></v-file-input>
          </v-col>
          <v-col
            md="4"
            sm="12"
          >
            <v-select
              v-model="form.type"
              :items="form.items"
              outlined
              chips
              label="نوع آیتم"
            ></v-select>
            <v-text-field
              outlined
              name="input-7-4"
              label="قیمت"
              v-model="form.price"
            ></v-text-field>
          </v-col>
          <v-col
            md="4"
            sm="12"
          >
            <v-text-field
              outlined
              name="input-7-4"
              label="مقدار"
              v-model="form.amount"
            ></v-text-field>
            <v-text-field
              outlined
              name="input-7-4"
              label="توضیحات"
              v-model="form.description"
            ></v-text-field>

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
  name: "Shop",

  props: {

    form: {},

    loading: false,
    edit: false,
  },

  data() {
    return {
      editBtn: "ویرایش",
      addBtn: "افزودن",
    }
  },

  methods: {
    createPremiumAvatar() {
      this.$emit('addPremiumAvatar')
    }

  }

}
</script>

<style scoped>

</style>
