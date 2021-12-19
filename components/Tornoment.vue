<template>
  <v-card>
    <v-card-title class="my-5">
      افزودن تورنومنت
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addTournament">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="form.value"
              :items="form.item"
              item-text="name"
              item-value="id"
              label="دسته بندی"
              multiple
              outlined
            >
              <template #selection="{ item }">
                <v-chip color="pink">{{item.name}}</v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col md="3" >
            <v-radio-group
              v-model="form.type"
              row
            >
              <v-radio
                label="تورنومنت ماهانه"
                value="1"
              ></v-radio>
              <v-radio
                label="تورنومنت هفتگی"
                value="0"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row
          align="center"
        >
          <v-col  md="4" sm="12">
            <v-date-picker
              v-model="form.date"
              color="pink"
            >
            </v-date-picker>
          </v-col>
          <v-col  md="4" sm="12">
            <v-time-picker
              v-model="form.time"
              use-seconds
              color="pink"
            >
            </v-time-picker>
          </v-col>
        </v-row>
        <v-btn
          type="submit"
          :loading="loading"
          color="pink"
          class="my-7"
        >
          {{ edit ? editBtn : addBtn }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

  props: {

    form: {
      type: Object,
      default: {
        value: {
          type: Array,
          default: []
        },

        item: {
          type: Array,
          default: []
        },

        date: {
          type: String,
          default: ''
        },

        time: {
          type: String,
          default: ''
        },

        type: {
          type: Boolean,
          default: false
        },
      },
    },
    loading: {
      type: Boolean,
      default: false
    },

    edit: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      editBtn: 'ویرایش',
      addBtn: 'افزودن',
    }
  },

  methods: {
    addTournament() {
      // console.log(this.form.date + " " + this.form.time);
      this.$emit('createTournament')
    }
  }
}
</script>

<style>

</style>
