<template>
  <div>
    <Categories
      :form="form"
      :loading="loading"
      :edit="edit"
      @addCategoryToList="createCategory"
    />
    <v-data-table class="mt-4" :headers="headers" :items="lists" hide-default-footer>
      <template v-slot:item="row" >
        <tr>
          <td> <img :src="row.item.icon" alt="" width="50"></td>
          <td>{{row.item.name}}</td>
          <td>{{row.item.description}}</td>
          <td>
            <v-icon @click="deleteList(row.item.id)" color="red accent-3">mdi-delete</v-icon>
            <v-icon @click="goEdit(row.item.id)" color="light-blue accent-2">mdi-pencil</v-icon>
            <v-icon @click="addQuestion(row.item.id)" color="light-green accent-4">mdi-plus-circle</v-icon>
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
import Categories from "~/components/Categories";
export default {
  name: "index",
  components: { Categories},

  data () {
    return {
      form : {
        name: '',
        description: '',
        icon: '',
      },
      edit: false,
      loading: false,

      headers:[
        {
          text: 'آیکون',
          value: '',
          align:'right',
        },
        {
          text: 'نام دسته بندی',
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
    }
  },

  created() {
    this.categoryList()
  },

  watch: {
    page() {
      this.categoryList();
    }
  },

  methods: {
    addQuestion(id) {
      this.$router.push(`category/${id}`)
    },

    createCategory(id) {
      this.loading = true;
      this.$store.dispatch(this.edit ? 'category/update' : 'category/create', {
        name: this.form.name,
        description: this.form.description,
        icon: this.form.icon,
        id: this.form.id
        }
      )
        .then(res => {
          if (res) {
            // console.log(res)
            this.categoryList();
            }
           else {
            this.loading = false;
          }
        });
      this.form.icon = ''
      this.form.name = ''
      this.form.description = ''
    },

    categoryList() {
      this.$store.dispatch("category/list", {
        page: this.page
      })
        .then (res => {
          if (res) {
            // console.log(res);
            this.lists = res.data;
            this.last_page = res.last_page
          }
        })
    },

    deleteList(id) {
      this.$axios.delete(`/api/admin/categories/delete/${id}`)
      .then( res => {
        this.lists.splice(id , 1);
      })
      },

    goEdit(id) {
      this.edit = true
      this.$axios.$get(`/api/admin/categories/show/${id}`)
        .then( res => {
          this.form = res.result
        })

    },

    
  }
}
</script>

<style scoped>

</style>
