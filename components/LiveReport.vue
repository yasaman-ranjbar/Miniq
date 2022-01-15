<template>
  <v-alert
    color="pink"
    border="top"
    dark
  >
    <h3 class="mb-7">گزارش زنده بازی ها</h3>

    <v-row class="mb-5">
      <v-col cols="4">تعداد بازی ها: {{ game_count }}</v-col>
      <v-col cols="4">تعداد افراد اضافه شده : {{ user_join_count }}  </v-col>
      <v-col cols="4">تعداد بازیکنان: {{ user_play_count }}  </v-col>
    </v-row>
  </v-alert>

</template>

<script>
export default {
  name: "LiveReport",

  data() {
    return {
      game_count: '',
      user_join_count: '',
      user_play_count: ''
    }
  },

created() {
  this.liveReport()
  this.list()
},


  methods: {
    liveReport() {
      this.$axios.$get('/api/admin/dashboard/live_report')
      .then(res => {
        this.game_count = res.result.game_count
        this.user_join_count = res.result.user_join_count
        this.user_play_count = res.result.user_play_count
      })
    },


    list() {
      this.$axios.$get('/api/admin/dashboard/list')
        .then( res => {
          console.log(res)
        })
    }

  }
}
</script>

<style scoped>

</style>
