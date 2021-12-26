<template>
<div>
  <Company
    :form="form"
    :loading="loading"
    :edit="edit"
    @addCompany="addCompany"
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
        <td>{{row.item.name}}</td>
        <td> <a :href="`http://${row.item.link}`" target="_blank"> {{row.item.link}} </a></td>
        <td>{{row.item.description}}</td>
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
import Company from "~/components/Company";
export default {
  name: "index",
  components: {Company},

  data() {
    return {
      form: {
        name: "",
        link: "",
        description: "",
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
      this.companyList();
    }
  },

  created() {
    this.companyList();
  },


  methods: {
    addCompany() {
      this.loading = true
      this.$store.dispatch( this.edit ? 'company/update' : 'company/create' ,{
        id: this.form.id,
        name: this.form.name,
        link: this.form.link,
        description: this.form.description,
      })
        .then(res => {
          if (res) {
            this.loading = false;
            this.companyList();
          } else {
            this.loading = false;
          }
        });
      this.form = {};
    },

    companyList() {
      this.$store.dispatch('company/list',{
        page: this.page,
      })
        .then(res=> {

          this.lists = res.data;
          this.last_page = res.last_page
        })
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    },

    deleteList(id) {
      this.$axios.delete(`/api/admin/companies/delete/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
        })
    },
  }
}
</script>

<style scoped>

</style>
