<template>
  <v-card>
    <v-card-title>
      افزودن پاسخ
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="createAnswer">

      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.text"
            label=" وارد کرن پاسخ "
            outlined
          ></v-text-field>
          <v-file-input
            label="آپلود صدا"
            v-model="form.voice_file"
            outlined
            dense
          ></v-file-input>
<<<<<<< HEAD
<!--          <v-switch-->
<!--            v-model="form.is_correct"-->
<!--            :label="form.is_correct ? 'پاسخ درست' : 'پاسخ اشتباه'"-->
<!--          ></v-switch>-->
          <v-radio-group
=======
           <v-radio-group
>>>>>>> afa4e07dfcea23d643f2798139f9c8acd5421019
            v-model="form.is_correct"
            row
          >
            <v-radio
              label="پاسخ درست"
              value="1"
            ></v-radio>
            <v-radio
              label="پاسخ اشتباه"
              value="0"
            ></v-radio>
          </v-radio-group>
<<<<<<< HEAD
=======
          <!-- <v-switch
            v-model="form.is_correct"
            :label="form.is_correct ? 'پاسخ درست' : 'پاسخ اشتباه' "
          ></v-switch> -->
>>>>>>> afa4e07dfcea23d643f2798139f9c8acd5421019

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

  props: {
<<<<<<< HEAD

    form:{
=======
   form:{
>>>>>>> afa4e07dfcea23d643f2798139f9c8acd5421019
      type: Object,
      default: {
        is_correct : 0,
        text: '',
        voice_file: '',
      },
    },

    edit:{
      type:Boolean,
      default: false
    },

    loading:false
  },

  data () {
    return {
      editBtn : 'ویرایش' ,
      addBtn : 'افزودن',
    }
  },

  methods: {
    createAnswer() {
      this.$emit('addAnswer')
    }
  }
}
</script>

<style scoped>

</style>
