<template>
  <div>
    <Avatar
      :form="form"
      :loading="loading"
      :edit="edit"
      @createAvatar="createAvatar"
    />
    <v-data-table class="mt-4"
                  :headers="headers"
                  :items="lists"
                  hide-default-footer
                  :items-per-page="itemPage"
    >
      <template v-slot:item="row" >
        <tr>
          <td> <img :src="row.item.avatar_file" alt="" width="50"></td>
          <td>{{row.item.name}}</td>
          <td>{{row.item.is_men ? 'پسر' : 'دختر'}}</td>
          <td>{{row.item.price}} تومان</td>
          <td>
<!--            <v-icon @click="deleteList(row.item.id)" color="red accent-3">mdi-delete</v-icon>-->
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
import Avatar from "~/components/Avatar";
export default {
  name: "avatar",
  comments: {Avatar},

  data() {
    return {
      form: {
        name: "",
        avatar_file:[],
        is_men: "",
        price: "",
      },

      loading: false,

      edit: false,

      headers:[
        {
          text: 'آواتار',
          value: '',
          align:'right',
        },
        {
          text: 'نام',
          value: '',
          align:'right',
        },
        {
          text: 'جنسیت',
          value: '',
          align:'right',
        },
        {
          text: 'قیمت',
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
      this.avatarList();
    }
  },

  created() {
    this.avatarList()
  },

  methods: {
    createAvatar() {
      this.loading = true;
      this.$store.dispatch(this.edit ? 'avatar/update' : 'avatar/create', {
          name: this.form.name,
          avatar_file: this.form.avatar_file,
          is_men: this.form.is_men,
          price: this.form.price,
          id: this.form.id
        }
      )
        .then(res => {
          if (res) {
            this.avatarList();
            this.loading = false;
          }
          else {
            this.loading = false;
          }
        });
      this.form = {};
    },

    avatarList() {
      this.$store.dispatch("avatar/list", {
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
      this.form = item
    },
  }
}
</script>

<style scoped>

</style>
