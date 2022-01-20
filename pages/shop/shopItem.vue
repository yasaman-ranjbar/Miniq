<template>
<div>
  <Shop
    :form="form"
    :loading="loading"
    :edit="edit"
    @addShopItem="addShopItem"
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
        <td> <img :src="row.item.icon" alt="" /> </td>
        <td>{{row.item.title}}</td>
        <td>{{row.item.amount}}</td>
        <td>{{row.item.price}}</td>
        <td>{{row.item.type}}</td>
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
import Shop from "@/components/Shop/Shop"
export default {
  name: "shop",
  comments: {Shop},

  data() {
    return {
      form: {
        title:"",
        icon_file: [],
        type: "",
        items: ['elixir', 'gem' , 'charge'],
        price: "",
        amount: "",
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
          text: 'آیکون',
          value: '',
          align:'right',
        },
        {
          text: 'عنوان',
          value: '',
          align:'right',
        },
        {
          text: 'مقدار',
          value: '',
          align:'right',
        },
        {
          text: 'قیمت',
          value: '',
          align:'right',
        },
        {
          text: 'نوع آیتم',
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
      this.shopItemList();
    }
  },

  created() {
    this.shopItemList();
  },

  methods:{
    shopItemList() {
      this.$store.dispatch('shop/list',{
        page: this.page,
      })
        .then(res=> {

          this.lists = res.data;
          this.last_page = res.last_page
        })
    },

    addShopItem() {
      this.loading = true
      this.$store.dispatch( this.edit ? 'shop/update' : 'shop/create' ,{
        id: this.form.id,
        title: this.form.title,
        icon_file: this.form.icon_file,
        type: this.form.type,
        price: this.form.price,
        amount: this.form.amount,
        description: this.form.description,
      })
        .then(res => {
          if (res) {
            this.loading = false;
            this.shopItemList();
          } else {
            this.loading = false;
          }
        });
      this.form = {};
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    },

    deleteList(id) {
      this.$axios.delete(`/api/admin/banks/delete/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
        })
    },
  }
}
</script>

<style scoped>

</style>
