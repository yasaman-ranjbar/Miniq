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
  <v-data-table class="mt-4"
                :headers="headers"
                :items="lists"
                hide-default-footer
                :items-per-page="15"
  >
          <template v-slot:item="row" >
            <tr class="text-center">
              <td> {{row.item.id}}</td>
              <td> {{row.item.avatar}}</td>
              <td> {{row.item.fullname}}</td>
              <td>{{row.item.mobile}}</td>
              <td>{{row.item.created_at}}</td>
              <td>{{row.item.rank}}</td>
              <td>
                  <v-chip
                    class="ma-2"
                    color="teal accent-3"
                    text-color="black"
                  >
                    {{row.item.elixir}}
                  </v-chip>
              </td>
              <td>
                <v-chip
                      class="ma-2"
                      color="light-blue lighten-3"
                      text-color="black"
                    >
                  {{row.item.gem}}
                </v-chip>
              </td>
              <td>
                <!-- <v-icon @click="goEdit(row.item)" color="light-blue accent-2">mdi-pencil</v-icon> -->
                <v-icon @click="showProfile(row.item)" color="light-green accent-2">mdi-eye-check</v-icon>
              </td>
              <td>
               <v-icon @click="baneUser(row.item)" color="blue-grey lighten-2">
                 mdi-account-cancel
               </v-icon>
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

      <v-snackbar
        v-if="baneMessage"
        :timeout="1000"
        :value="true"
        absolute
        centered
        top
        tile
        color="red accent-2"
      >
        اکانت بسته شد
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            بستن
          </v-btn>
        </template>
      </v-snackbar>

</div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      headers: [
        {
          text: 'شناسه ',
          value: '',
          align:'center',
        },
        {
          text: 'آواتار ',
          value: '',
          align:'center',
        },
        {
          text: 'نام ',
          value: '',
          align:'center',
        },
        {
          text: 'شماره موبایل',
          value: '',
          align:'center',
        },
        {
          text: 'تاریخ ساخت یوزر',
          value: '',
          align:'center',
        },
        {
          text: 'امتیاز کاربر',
          value: '',
          align:'center',
        },
        {
          text: 'اکسیر',
          value: '',
          align:'center',
        },
        {
          text: 'الماس',
          value: '',
          align:'center',
        },
        {
          text: 'نمایش جزییات',
          value: '',
          align:'center',
        },
        {
          text: 'بستن اکانت',
          value: '',
          align:'center',
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

      baneMessage: false,

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
        this.lists = res.data;
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
    },

    baneUser(id) {
      this.$axios.$get(`api/admin/users/show/${id.id}/toggle_active`)
      .then(res => {
        this.baneMessage = true;
      })
    }
  }
}
</script>

<style scoped>

</style>
