<template>
<div>
  <v-data-table class="mt-4"
                :headers="headers"
                :items="lists"
                hide-default-footer
                :items-per-page="15"
  >
    <template v-slot:item="row" >
      <tr>
        <td>{{row.item.register_count}}</td>
        <td>{{row.item.total_register_count}}</td>
        <td>{{row.item.total_solo_game_count}}</td>
        <td>{{row.item.solo_game_count}}</td>
        <td>{{row.item.total_group_game_count}}</td>
        <td>{{row.item.group_game_count}}</td>
        <td>{{row.item.total_charge_gift_count}}</td>
        <td>{{row.item.ode_gift_count}}</td>
        <td>{{row.item.report_date}}</td>
      </tr>
    </template>
  </v-data-table>
  <div>
    <v-pagination
      class="ma-4"
      v-model="page"
      :length="last_page"
      :total-visible="7"
    ></v-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      headers: [
        {
          text: 'register count',
          value: '',
          align: 'right',
        },
        {
          text: 'total register',
          value: '',
          align: 'right',
        },
        {
          text: 'total solo game',
          value: '',
          align: 'right',
        },
        {
          text: ' solo game',
          value: '',
          align: 'right',
        },
        {
          text: 'total group game',
          value: '',
          align: 'right',
        },
        {
          text: 'game count',
          value: '',
          align: 'right',
        },
        {
          text: 'charge gift',
          value: '',
          align: 'right',
        },
        {
          text: 'ode',
          value: '',
          align: 'right',
        },
        {
          text: 'report date',
          value: '',
          align: 'right',
        },
      ],

      page: 1,
      last_page: 0,

      lists: [] ,
    }
  },

  created() {
    this.getReportList();
  },

  watch: {
    page() {
      this.getReportList();
    }
  },

  methods: {
    getReportList() {
      this.$store.dispatch('report/list', {
        page: this.page,
      })
        .then(res => {
          this.lists = res.data;
          this.last_page = res.last_page
        })
    },
  }
}
</script>

<style scoped>

</style>
