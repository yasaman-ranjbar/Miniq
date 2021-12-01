<template>
<div>
  <v-card v-if="edit">
    <v-card-title>
     ویرایش کاربر
    </v-card-title>
    <v-card-text>
      <v-form  @submit.prevent="editUser">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label=" نام کاربری"
              outlined
              v-model="form.fullname"
              color="primary"
            >
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="شماره موبایل"
              outlined
              v-model="form.mobile"
              color="primary"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn
          class="mt-3"
          type="submit"
          color="pink"
        >
          ویرایش
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  <v-data-table class="mt-4" :headers="headers" :items="lists" hide-default-footer>
    <template v-slot:item="row" >
      <tr>
        <td> {{row.item.fullname}}</td>
        <td>{{row.item.mobile}}</td>
        <td>{{row.item.rank}}</td>
        <td>
          <v-icon @click="goEdit(row.item)" color="light-blue accent-2">mdi-pencil</v-icon>
          <v-icon @click="showProfile(row.item)" color="pink">mdi-eye-check</v-icon>
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
export default {
  name: "index",
  data() {
    return {
      headers: [
        {
          text: 'نام ',
          value: '',
          align:'right',
        },
        {
          text: 'شماره موبایل',
          value: '',
          align:'right',
        },
        {
          text: 'امتیاز کاربر',
          value: '',
          align:'right',
        },
        {
          text: 'ویرایش',
          value: '',
          align:'right',
        },
      ],

      form:{
        fullname:'',
        mobile:'',
      },

      page: 1,
      last_page: 0,

      lists: [] ,
      edit: false,
      loading: false,

      userId : '' ,

    }
  },

  created() {
    this.getUserList();
  },

  watch: {
    page() {
      this.getUserList();
    }
  },

  methods: {
    getUserList(){
      this.$store.dispatch('user/list',{
        page: this.page
      })
      .then(res=> {
        this.lists = res
        this.last_page = res.last_page
      })
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    },

    editUser(id) {
      this.$store.dispatch('user/update' , {
        fullname: this.form.fullname,
        mobile: this.form.mobile,
        id: this.form.id
      })
        .then(res => {
          if (res) {
            this.loading = false;
            this.getUserList();
          } else {
            this.loading = false;
          }
        });
          this.form = '';
    },

    showProfile(id) {
      this.$router.push(`users/${id.id}`)
    }
  }
}
</script>

<style scoped>

</style>
