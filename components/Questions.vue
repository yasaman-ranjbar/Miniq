<template>
  <v-card>
    <v-card-title>
      افزودن سوال
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          label="سوال"
          outlined
          v-model="form.text"
          color="primary"
        >
        </v-text-field>
        <v-btn
          @click="addQuestion"
          :loading="loading"
          color="pink"
        >
          افزودن سوال
        </v-btn>

      </v-form>


    </v-card-text>

  </v-card>
</template>

<script>
export default {

  props: {
    form:{
      type: Object,
      default: {
        text: '',
      },
    },

    category_id:'',

    loading:false
  },

  data(){
    return {

    }
  },

  methods: {
    addQuestion() {
      this.$emit('createQuestion')
    }
  }
}
</script>

<style>

</style>
