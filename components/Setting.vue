<template>
    <v-card>
    <v-card-title>
      ورژن بازی
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="createVersion">

      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.version_code"
            label=" کد ورژن "
            outlined
          ></v-text-field>
          <v-radio-group
            v-model="form.is_force"
            row
          >
            <v-radio
              label="روشن"
              value="1"
            ></v-radio>
            <v-radio
              label="خاموش"
              value="0"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
        <v-btn
          :loading="loading"
          type="submit"
          color="pink"
        >
         افزودن
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    props: {

    form:{},
    loading:false
  },


  methods: {
    createVersion() {
      this.$emit('addVersion')
    }
  }

}
</script>

<style>

</style>