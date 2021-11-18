<template>
  <div>
    <Categories
      :form="form"
      :loading="loading"
      :edit="edit"
      @addCategoryToList="createCategory"
    />
    <v-data-table class="mt-4" :headers="headers" :items="lists">
      <template v-slot:item="row" >
        <tr>
          <td> <img :src="row.item.icon" alt="" width="50"></td>
          <td>{{row.item.name}}</td>
          <td>{{row.item.description}}</td>
          <td>
            <v-icon @click="deleteList(row.item.id)" color="red">mdi-delete</v-icon>
            <v-icon @click="goEdit(row.item.id)" color="blue">mdi-pencil</v-icon>
            <v-icon @click="addQuestion(row.item.id)" color="green">mdi-plus-circle</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

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
    }
  },

  created() {
    this.categoryList()
  },

  methods: {
    addQuestion(id) {
      this.$router.push(`category/question/${id}`)
    },

    createCategory(id) {
      this.loading = true;
      this.$store.dispatch(this.edit ? 'category/update' : 'category/create', {
        name: this.form.name,
        description: this.form.description,
        icon: this.form.icon,
        }
      )
        .then(res => {
          if (res) {
            console.log(res)
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
      this.$store.dispatch("category/list")
        .then (res => {
          if (res) {
            console.log(res);
            this.lists = res;
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
      // this.isUpdating = true
      // this.$axios.$get(`/api/admin/categories/show/${id}`)
      // .then( res => {
      //   console.log(res.result.name)
      //   this.form.name = res.result.name
      //   this.form.description = res.result.description
      //   this.form.icon = res.result.icon
      // })
    },

    // updateCategory(id) {
    //   this.isUpdating = true
    //   if( this.isUpdating = true) {
    //     this.$axios.$put(`/api/admin/categories/edit/${id}`)
    //     .then (res => {
    //       console.log(res)
    //       // res.result.name = this.form.name
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
