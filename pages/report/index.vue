<template>
<div>
  <v-data-table class="mt-4 elevation-2"
                :headers="headers"
                :items="lists"
                hide-default-footer
                :items-per-page="15"
  >
    <template v-slot:item="row" >
      <tr>
        <td class="text-center">{{row.item.register_count}}</td>
        <td class="text-center">{{row.item.total_register_count}}</td>
        <td class="text-center">{{row.item.total_solo_game_count}}</td>
        <td class="text-center">{{row.item.solo_game_count}}</td>
        <td class="text-center">{{row.item.total_group_game_count}}</td>
        <td class="text-center">{{row.item.group_game_count}}</td>
        <td class="text-center">{{row.item.total_charge_gift_count}}</td>
        <td class="text-center">{{row.item.code_gift_count}}</td>
        <td class="text-center">{{$moment(row.item.report_date).format('jYYYY/jM/jDD')}}</td>
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
          text: 'تعداد کاربران امروز',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: 'جمع کاربران',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: 'جمع کل بازی نفر به نفر',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: ' بازی نفر به نفر',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: 'جمع کل بازی گروهی',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: 'بازی گروهی',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: 'شارژ',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: 'کد تخفیف',
          value: '',
          align: 'center',
          width: '10px'
        },
        {
          text: 'تاریخ',
          value: '',
          align: 'center',
          width: '10px'
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
