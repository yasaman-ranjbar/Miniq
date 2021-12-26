<template>
  <v-card>
    <v-card-title>
      افزودن صدا
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="createVoice">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="نام شخصیت صدا"
              outlined
              v-model="form.name"
              color="primary"
            >
            </v-text-field>
            <v-file-input
              label="آپلود صدا"
              v-model="form.voice_file"
              outlined
              prepend-icon="mdi-paperclip"
            >
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
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
  name: "Voice",

  props: {

    form: {
      // type: Object,
      // default: {
      //   voice_file : [],
      //   name: "",
      // },
    },

    loading: false,
    edit: false,
  },

  data() {
    return {
      editBtn: "ویرایش",
      addBtn: "افزودن"
    }
  },

  methods: {
    createVoice() {
      this.$emit('addVoice')
    }
  }
}
</script>

<style scoped>

</style>
