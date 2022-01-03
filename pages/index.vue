<template>
    <div>

      <v-row>
        <v-col
          class="d-flex child-flex"
          cols="6"
        >
          <TotalUser />
        </v-col>
        <v-col
          class="d-flex child-flex"
          cols="6"
        >
          <SoloGame />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="d-flex child-flex"
          cols="6"
        >
          <GroupGame />
        </v-col>
        <v-col
          class="d-flex child-flex"
          cols="6"
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
export default {
  components: {Charge, GroupGame, SoloGame, TotalUser},
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
