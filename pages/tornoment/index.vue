<template>
  <div>
    <Tornoment
      :loading="loading"
      :form="form"
      :edit="edit"
      @createTournament="createTournament"
     />
    <v-data-table class="mt-4" :headers="headers" :items="lists" hide-default-footer>
      <template v-slot:item="row" >
        <tr>
          <td> {{row.item.start_time}}</td>
          <td>{{row.item.type = 0 ? 'تورنومنت هفتگی' : 'تورنومنت ماهانه'}}</td>
          <td>
            <v-icon @click="goDelete(row.item.id)" color="red accent-3">mdi-delete</v-icon>
            <v-icon @click="goEdit(row.item)" color="light-blue accent-2">mdi-pencil</v-icon>
          </td>
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
import Tornoment from '~/components/Tornoment.vue'
export default {
  components: { Tornoment },

  data() {
    return {
      form:{
        item: [],
        value: [] ,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        time: null,
        type: false,
      },
      loading:false,

      headers: [
        {
          text: 'تاریخ شروع تورنومنت ',
          value: '',
          align:'right',
        },
        {
          text: 'نوع تورنومنت',
          value: '',
          align:'right',
        },
        {
          text: 'عملیات',
          value: '',
          align:'right',
        },
      ],

      lists:[] ,
      category_ids: [],

      page: 1,
      last_page: 0,

      edit: false,
    }
  },

  created() {
    this.categoryList();
    this.tornomentList();
  },

  methods: {
    createTournament() {
      const start_time = this.form.date + " " + this.form.time;
      this.$store.dispatch(this.edit ? 'tournoment/update' : 'tournoment/create', {
        category_ids : this.form.value,
        start_time : start_time,
        type: this.form.type
      })
      .then(res=> {
        if (res) {
          this.tornomentList();
        }
        else {
          this.loading = false;
        }
      })
      this.start_time = ''
      this.form.value = ''
      this.form.type = ''
    },

    categoryList() {
      this.$store.dispatch('category/list' , {
        page: this.form.item
      })
      .then(res=> {
        this.form.item = res.data

      })
    },

    tornomentList() {
      this.$store.dispatch("tournoment/list", {
        page: this.page
      })
        .then (res => {
          if (res) {
            this.lists = res.data;
            this.last_page = res.last_page
          }
        })
    },

    goEdit(item) {
      this.edit = true
      this.form.value = item.value
    },

    showProfile() {

    },

    goDelete(id) {
      this.$axios.delete(`/api/admin/tournaments/delete/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
          this.tornomentList();
        })
    }

}

}
</script>

<style>

</style>
