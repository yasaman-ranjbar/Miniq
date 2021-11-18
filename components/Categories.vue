<template>
  <v-card>
    <v-card-title>
      افزودن دسته بندی
    </v-card-title>
    <v-card-text>

      <v-form ref="form" @submit.prevent="addCategory">
        <v-text-field
          label=" نام دسته بندی"
          outlined
          v-model="form.name"
          color="primary"
          :rules="rules"
        >
        </v-text-field>
        <v-text-field
          label="توضیحات"
          outlined
          v-model="form.description"
          color="primary"
          :rules="rules"
        >
        </v-text-field>
        <v-file-input
          label="آیکون"
          v-model="form.icon"
          prepend-icon="mdi-camera"
          :rules="rules"
          outlined
        ></v-file-input>
        <v-btn
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
  name: "Categories",

  props: {

        form:{
          type: Object,
          default: {
            name: '',
            description: '',
            icon: ''
          }
        },
      edit:{
         type:Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
  },

  data() {
    return {
      editBtn : 'ویرایش' ,
      addBtn : 'افزودن',
      rules: [
        value => !value || 'مقدار نباید خالی باشد',
      ],
    }
  },


  methods: {

    addCategory() {
        this.$emit('addCategoryToList')
    }
  }
}
</script>

<style scoped>

</style>
