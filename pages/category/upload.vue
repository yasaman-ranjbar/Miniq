<template>
  <div>
    <UploadQuestion
      :loading="loading"
      :form="form"
      @uploadFile="uploadFile"
    />

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
      centered
      top
      color="green darken-1"
    >
     عملیات شما با موفقیت انجام شد

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          بستن
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import UploadQuestion from "~/components/UploadQuestion";
export default {
  components: {UploadQuestion },

  data() {
    return {
      snackbar: false,
      timeout: 3000,

      form:{
        item: [],
        value: [] ,
        question_file: [],
      },
      loading:false,

      category_ids: "",
    }
  },

  created() {
    this.categoryList();
  },

  methods: {
    uploadFile() {
      this.loading = true;
      this.$store.dispatch('uploadExcell/create', {
        category_ids : this.form.value,
        question_file: this.form.question_file
      })
        .then(res=> {
          this.snackbar = true;
          console.log(this.form.value)
        })
          this.form.value = ''
          this.loading = false

    },

    categoryList() {
      this.$store.dispatch('category/list' , {
        page: this.form.item
      })
        .then(res=> {
          this.form.item = res.data
        })
    },


  }

}
</script>

<style>

</style>


