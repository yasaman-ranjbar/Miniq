<template>
  <div>
    <Gift
      :form="form"
      :loading="loading"
      :edit="edit"
      @addGift="addGift"
    />
    <v-data-table class="mt-4"
                  :headers="headers"
                  :items="lists"
                  hide-default-footer
                  :items-per-page="itemPage"
    >
      <template v-slot:item="row" >
        <tr>
          <td> {{row.item.id}}</td>
          <td> {{form.value.name}}</td>
          <td>{{row.item.code}}</td>
          <td> <a :href="`http://${row.item.link}`" target="_blank"> {{row.item.link}} </a></td>
          <td>{{row.item.description}}</td>
          <td>{{row.item.expired_at}}</td>
          <td>
            <v-icon @click="deleteList(row.item.id)" color="red accent-3">mdi-delete</v-icon>
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
import Gift from "~/components/Gift";
export default {
  name: "index",
  components: {Gift},

  data() {
    return {
      form: {
        item: [],
        value: [] ,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        time: null,
        company_name: '',
        company_id: '',
        code: '',
        description: '',
        link:'',
      },

      loading: false,
      edit: false,

      headers:[
        {
          text: 'شناسه',
          value: '',
          align:'right',
        },
        {
          text: 'نام کمپانی',
          value: '',
          align:'right',
        },
        {
          text: 'کد تخفیف',
          value: '',
          align:'right',
        },
        {
          text: 'لینک وب سایت',
          value: '',
          align:'right',
        },
        {
          text: 'توضیحات',
          value: '',
          align:'right',
        },
        {
          text: 'تاریخ انقضای کد',
          value: '',
          align:'right',
        },
        {
          text: 'عملیات',
          value: '',
          align:'right',
        },
      ],

      lists: [],

      page: 1,
      last_page: 0,

      itemPage: 15,
    }
  },

  watch: {
    page() {
      this.giftList();
    }
  },

  created() {
    this.giftList();
    this.companyList();
  },

  methods: {
    addGift() {
      const expired_at = this.form.date + " " + this.form.time;
      this.$store.dispatch(this.edit ? 'gift/update' : 'gift/create', {
        company_id : this.form.value,
        code: this.form.code,
        description: this.form.description,
        link: this.form.link,
        expired_at : expired_at,
      })
        .then(res=> {
          if (res) {
            this.giftList();
          }
          else {
            this.loading = false;
          }
        })
      this.form = {}
    },

    giftList() {
      this.$store.dispatch('gift/list',{
        page: this.page,
      })
        .then(res=> {
          this.lists = res.data;
          this.last_page = res.last_page
        })
    },

    companyList() {
      this.$store.dispatch('company/list' , {
        page: this.form.item
      })
        .then(res=> {
          this.form.item = res.data
        })
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    },

    deleteList(id) {
      this.$axios.delete(`/api/admin/gift_codes/delete/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
        })
    },

  },


}
</script>

<style scoped>

</style>
