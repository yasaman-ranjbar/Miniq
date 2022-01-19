<template>
  <v-card>
    <v-card-title>
      افزودن آواتار
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addAvatar">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.name"
              label="نام"
              outlined
            ></v-text-field>
            <v-file-input
              label="آپلود آواتار"
              v-model="form.avatar_file"
              prepend-icon="mdi-camera"
              outlined
            ></v-file-input>
            <v-img :src="url"></v-img>
            <v-text-field
              v-model="form.price"
              label="قیمت"
              outlined
            ></v-text-field>
            <v-radio-group
              v-model="form.is_men"
              row
            >
              <v-radio
                label="پسر"
                value="1"
              ></v-radio>
              <v-radio
                label="دختر"
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
          {{ edit ? editBtn : addBtn}}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Avatar",

  props: {
    form: {},
    loading: false,
    edit: false,
    },

  data(){
    return {
      editBtn: 'ویرایش',
      addBtn: 'ثبت',
    }
  },

  computed: {
    url() {
      if (!this.image) return;
      return URL.createObjectURL(this.image);
    }
  },

  methods: {
    addAvatar() {
      this.$emit('createAvatar')
    },

    // Preview_image() {
    //   this.url= URL.createObjectURL(this.image)
    // }
  }
}
</script>

<style scoped>

</style>
