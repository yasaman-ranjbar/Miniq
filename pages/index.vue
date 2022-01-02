<template>
    <div>
          <v-card
            class="mx-auto text-center no-gutters"
            color="green"
            dark
            max-width="800"
          >
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="value"
                  color="rgba(255, 255, 255, .7)"
                  height="250"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                  auto-draw
                >
                  <template v-slot:label="item">
                   {{ item.value }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-card-text>
              <div class=" font-weight-thin">
                تعداد کاربران
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="justify-center">
              <v-btn
                block
                text
                to="/report"
              >
                گزارش کامل
              </v-btn>
            </v-card-actions>
          </v-card>
    </div>
</template>
<script>
export default {
  data: () => ({
    value: [
      0,
      53,
      54,
      54,
      89,
      128,
      158
    ],
  }),

  // created() {
  //   this.userCount();
  // },
  //
  // methods: {
  //   userCount() {
  //     this.$store.dispatch('report/list', {
  //       page: this.page,
  //     })
  //       .then(res => {
  //         console.log(res.data)
  //         this.value = res.data;
  //       })
  //   },
  // }



}
</script>
