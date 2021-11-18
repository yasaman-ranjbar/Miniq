<template>
  <div>
    <v-alert
      border="left"
      color="pink darken-1"
      dark
    >
      <img :src="category_Icon" alt="" width="30">  {{ category_Name }}
    </v-alert>

    <Questions
      :form="form"
      :category_id="category_id"
      :loading="loading"
      @createQuestion="createQuestion"
    />

    <v-data-table class="mt-4" :headers="headers" :items="questions">
      <template v-slot:item="row" >
        <tr>
          <td>{{row.item.text}}</td>
          <td>
            <v-icon @click="deleteQuestion(row.item.id)" color="red">mdi-delete</v-icon>
            <v-icon color="blue">mdi-pencil</v-icon>
            <v-icon @click="addAnswer(row.item.id)" color="green">mdi-plus-circle</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Questions from "~/components/Questions";
export default {
  components: {Questions},

  data() {
    return {
      headers: [
        {
          text: 'سوال',
          value:'id',
          align:'right',
        },
        {
          text: 'عملیات',
          value:'id',
          align:'right',
        },
      ],

      questions:[],
      form: {
        text:''
      },
      category_id: this.$route.params.id,
      loading:false,
      category_Name: '',
      category_Icon: '',
    }
  },

  created() {
    this.questionsList();
    this.showCategory();
  },


  methods:{
    createQuestion() {
      this.loading = true
      this.$store.dispatch('question/create' ,{
        text: this.form.text,
        category_id: this.category_id
      })
        .then(res => {
          if (res) {
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
      this.form.text = '';
    },

    questionsList() {
      this.$axios.$get(`/api/admin/questions/list/category/${this.category_id}`)
      .then( res=> {
        this.questions = res.result.data
      })
    },

    deleteQuestion(id) {
      this.$axios.delete(`/api/admin/questions/delete/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
        })
    },

    addAnswer(id) {
      this.$router.push(`${this.category_id}/answers/${id}`)
    },

    showCategory() {
      this.$store.dispatch('category/show', {
        name : this.category_Name,
        id: this.category_id,
      })
        .then (res => {
            this.category_Name = res.name;
            this.category_Icon = res.icon;
        })
    }
  }
}
</script>

<style scoped>

</style>
