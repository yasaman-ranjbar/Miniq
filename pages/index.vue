<template>
  <div>

    <v-row>
      <v-col>
        <LiveReport/>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="4" md="4" sm="12">
        <v-card
          light
          color="white"
          class="my-8"
        >
          <v-card-text>
            <TotalUser
              class="yr_margin"
              :value="total_user"
            />
            <h3>تعداد کاربران</h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-icon>mdi-clock-time-three-outline</v-icon>
            آخرین آپدیت 24 ساعت پیش
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col lg="4" md="4" sm="12">
        <v-card
          light
          color="white"
          class="my-8"
        >
          <v-card-text>
            <SoloGame
              class="yr_margin"
              :value="solo_game"
            />
            <h3>بازی نفر به نفر</h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-icon>mdi-clock-time-three-outline</v-icon>
            آخرین آپدیت 24 ساعت پیش
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col lg="4" md="4" sm="12">
        <v-card
          light
          color="white"
          class="my-8"
        >
          <v-card-text>
            <GroupGame
              class="yr_margin"
              :value="group_game"
            />
            <h3>بازی گروهی</h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-icon>mdi-clock-time-three-outline</v-icon>
            آخرین آپدیت 24 ساعت پیش
          </v-card-subtitle>
        </v-card>
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

          this.total_user = this.total_user.slice().reverse();
          this.solo_game = this.solo_game.slice().reverse();
          this.group_game = this.group_game.slice().reverse();
        })
    },
  }


}
</script>

<style scoped>
.yr_margin {
  position: relative;
  top: -30px;
}
</style>
