<template>
    <v-card>
      <v-card-title>
        افزودن کد تخفیف
      </v-card-title>
      <v-card-text>

          <v-form @submit.prevent="createGift">
             <v-row>
                <v-col md="4" sm="12">
                  <v-select
                    v-model="form.value"
                    :items="form.item"
                    item-text="name"
                    item-value="id"
                    label="انتخاب کمپانی"
                    outlined
                  >
                    <template #selection="{ item }">
                      <v-chip color="pink">{{item.name}}</v-chip>
                    </template>
                  </v-select>

                  <v-text-field
                    label="لینک وب سایت"
                    outlined
                    v-model="form.link"
                    color="primary"
                  >
                  </v-text-field>
                </v-col>
                <v-col md="4" sm="12">
                  <v-text-field
                    label="کد تخفیف"
                    outlined
                    v-model="form.code"
                    color="primary"
                  >
                  </v-text-field>

                  <v-text-field
                    label="توضیحات"
                    outlined
                    v-model="form.description"
                    color="primary"
                  >
                  </v-text-field>
                </v-col>
            </v-row>
             <v-row
              align="center"
            >
              <v-col  md="4" sm="12">
                <p>انتخاب تاریخ انقضای کد تخفیف </p>
                <v-date-picker
                  v-model="form.date"
                  color="pink"
                >
                </v-date-picker>
              </v-col>
              <v-col  md="4" sm="12">
                <p>انتخاب ساعت انقضای کد تخفیف</p>
                <v-time-picker
                  v-model="form.time"
                  use-seconds
                  color="pink"
                >
                </v-time-picker>
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
  name: "Gift",

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

        code: {
          type: String,
          default: '',
        },

        description: {
          type: String,
          default: '',
        },

        link: {
          type: String,
          default: '',
        },

        date: {
          type: String,
          default: ''
        },

        time: {
          type: String,
          default: ''
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
      editBtn: "ویرایش",
      addBtn: "افزودن"
    }
  },

  methods: {
    createGift() {
      this.$emit('addGift')
    }
  }
}
</script>

<style scoped>

</style>
