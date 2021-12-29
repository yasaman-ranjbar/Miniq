<template>
  <v-card>
    <v-card-title>
      ویرایش سوال
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="editQuestion">
        <v-text-field
          label="سوال"
          outlined
          v-model="form.text"
          color="primary"
        >
        </v-text-field>
        <v-file-input
          label="آپلود صدا"
          v-model="form.voice_file"
          outlined
          dense
        ></v-file-input>
        <v-btn
          type="submit"
          :loading="loading"
          color="pink"
        >
        ویرایش
          <!-- {{ edit ? editBtn : addBtn}} -->
        </v-btn>

      </v-form>


    </v-card-text>

  </v-card>
</template>

<script>
export default {

  props: {
    form:{},

    edit:{
      type:Boolean,
      default: false
    },

    category_id:'',
    loading:false
  },

  data(){
    return {
      editBtn : 'ویرایش' ,
      addBtn : 'افزودن',
    }
  },

  methods: {
    editQuestion() {
      this.$emit('editQuestion')
    }
  }
}
</script>

<style>

</style>
