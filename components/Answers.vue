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
          <v-radio-group
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

    form:{
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
