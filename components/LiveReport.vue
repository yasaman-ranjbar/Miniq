<template>
  <v-alert
    border="top"
    colored-border
    color="amber darken-1"
    elevation="2"
    light
  >
    <h3 class="mb-7">گزارش زنده بازی ها</h3>

    <v-row class="mb-5">
      <v-col cols="4">تعداد بازی ها: {{ game_count }}</v-col>
      <v-col cols="4">تعداد افراد حاضر در بازی : {{ user_join_count }}  </v-col>
      <v-col cols="4">تعداد افراد منتظر برای بازی: {{ user_play_count }}  </v-col>
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
  this.liveReport();
    setInterval(this.liveReport , 1000)
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


  }
}
</script>

<style scoped>

</style>
