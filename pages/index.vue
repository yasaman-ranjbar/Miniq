<template>
    <div>
      <v-row>
        <v-col>
          <LiveReport />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          class="d-flex child-flex"
          md="6"
          sm="12"

        >
          <TotalUser />
        </v-col>
        <v-col
          class="d-flex child-flex"
          md="6"
          sm="12"

        >
          <SoloGame />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="d-flex child-flex"
          md="6"
          sm="12"

        >
          <GroupGame />
        </v-col>
        <v-col
          class="d-flex child-flex"
          md="6"
          sm="12"

        >
        <Charge />
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
  components: {LiveReport, Charge, GroupGame, SoloGame, TotalUser},
  data: () => ({

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
