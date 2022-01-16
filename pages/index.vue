<template>
  <div>

    <v-row>
      <v-col>
        <LiveReport/>
      </v-col>
    </v-row>

<!--    <v-card-->
<!--      class="mx-auto text-center no-gutters"-->
<!--      color="grey lighten-4"-->
<!--    >-->
<!--      <v-card-text>-->
<!--        <v-row>-->
<!--          <v-col cols="6">-->
<!--            <template>-->
<!--              <client-only>-->
<!--                <div>-->
<!--                  <VueApexCharts-->
<!--                    width="500"-->
<!--                    type="donut"-->
<!--                    :options="options"-->
<!--                    :series="series"-->
<!--                  ></VueApexCharts>-->
<!--                </div>-->
<!--              </client-only>-->
<!--            </template>-->
<!--          </v-col>-->
<!--          <v-col cols="6">-->
<!--            <template>-->
<!--              <client-only>-->
<!--                <div>-->
<!--                  <VueApexCharts-->
<!--                    width="500"-->
<!--                    type="bar"-->
<!--                    :options="options"-->
<!--                    :series="series"-->
<!--                  ></VueApexCharts>-->
<!--                </div>-->
<!--              </client-only>-->
<!--            </template>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-card-text>-->
<!--    </v-card>-->





    <v-row>
      <v-col
        class="d-flex child-flex"
        md="6"
        sm="12"

      >
        <TotalUser :value="total_user"/>
      </v-col>
      <v-col
        class="d-flex child-flex"
        md="6"
        sm="12"

      >
        <SoloGame :value="solo_game" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="d-flex child-flex"
        md="6"
        sm="12"

      >
        <GroupGame :value="group_game"/>
      </v-col>
      <v-col
        class="d-flex child-flex"
        md="6"
        sm="12"

      >
        <Charge :value="charge"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import TotalUser from "~/components/Chart/TotalUser";
import SoloGame from "~/components/Chart/SoloGame";
import GroupGame from "~/components/Chart/GroupGame";
import Charge from "~/components/Chart/Charge";
import LiveReport from "~/components/LiveReport";

export default {
  components: {LiveReport, Charge, GroupGame, SoloGame, TotalUser,
    VueApexCharts: () => import('vue-apexcharts')
  },

  data() {
    return {
      // options: {
      //   xaxis: {
      //     date: []
      //   }
      // },
      // series: [{
      //   total_user: []
      // }],
      total_user: [],
      solo_game: [],
      group_game: [],
      charge: [],
      page: 1,
    }
  },

  created() {
    this.userCount();
  },

  methods: {
    userCount() {
      this.$store.dispatch('report/list', {
        page: this.page,
      })
        .then(res => {
          res.data.map(x => {
            this.total_user.push(x.total_register_count);
          });
          res.data.map(x => {
            this.solo_game.push(x.solo_game_count);
          });
          res.data.map(x => {
            this.group_game.push(x.group_game_count);
          });
          res.data.map(x => {
            this.charge.push(x.total_charge_gift_count);
          });


          // res.data.map(x => {
          //   let date = this.$options.filters.formatDate(x.created_at);
          //   let user = x.total_register_count;
          //   this.days.push(date + ' - ' + user);
          // })
        })
    },
  }


}
</script>
