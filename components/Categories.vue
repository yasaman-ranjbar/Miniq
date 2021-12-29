<template>
  <v-card>
    <v-card-title>
      افزودن دسته بندی
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addCategory">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
        <v-text-field
          label=" نام دسته بندی"
          outlined
          v-model="form.name"
          color="primary"
        >
        </v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-file-input
              label="آیکون"
              v-model="form.icon"
              prepend-icon="mdi-camera"
              outlined
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-text-field
            label="توضیحات"
            outlined
            v-model="form.description"
            color="primary"
          >
          </v-text-field>
        </v-row>
        <v-btn
          class="mt-3"
          type="submit"
          color="pink"
          @click="addCategory"
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

        form:{},

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
      // rules: [
      //   value => !value || 'مقدار نباید خالی باشد',
      // ],
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
