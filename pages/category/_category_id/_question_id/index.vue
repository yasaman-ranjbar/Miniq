<template>
<div>
  <v-alert
    border="left"
    color="pink darken-1"
    dark
  >
   {{ this.Questions_Name}}
  </v-alert>
  <Answers
    :form="form"
    :loading="loading"
    :edit="edit"
    @addAnswer="addAnswer"
  />
  <v-data-table class="mt-4" :headers="headers" :items="lists">
    <template v-slot:item="row" >
      <tr>
        <td>
          <v-icon :color="row.item.is_correct ? 'light-green accent-4' : 'red accent-4'">
            {{ row.item.is_correct ? 'mdi-check-circle' : 'mdi-close-circle'}}
          </v-icon>
        </td>
        <td>{{row.item.text}}</td>
        <td>
          <v-icon @click="deleteAnswers(row.item.id)" color="red accent-3">mdi-delete</v-icon>
          <v-icon @click="goEdit(row.item)" color="light-blue accent-2">mdi-pencil</v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>

</div>
</template>

<script>
import Answers from "~/components/Answers";
export default {
  name: "index",
  components: { Answers },

  data() {
    return {
      form:{
        is_correct: false, // default: true or false
        text: ''
      },
      loading:false,

      id: this.$route.params.question_id,

      headers:[
        {
          text: 'وضعیت جواب ها',
          value: '',
          align:'right',
        },
        {
          text: 'جواب ها',
          value: '',
          align:'right',
        },
        {
          text: 'عملیات',
          value: '',
          align:'right',
        },
      ],

      edit:false,
      lists: [],

      Questions_Name: '',
      category_Id : '',
      Question_Id : this.$route.params.question_id,
    }
  },

  created() {
    this.listAnswer();
    this.showAnswer();
  },

  methods:{
    addAnswer() {
      if(this.edit){
        this.$axios.$put(`/api/admin/answers/edit/${this.Question_Id}/${this.form.id}`, this.form)
        .then(res=> {
          this.form.text = res.result.text
          this.form = {
            is_correct: false,
            text: ''
          }
          this.listAnswer();
          // this.form.is_correct = res.result.is_correct
        })
      }

      else {
        this.$axios.post(`/api/admin/answers/create/${this.id}`, this.form)
          .then( res => {
            this.listAnswer();
          })
            // this.form.is_correct = ""
            // this.form.text = ''
          .catch(err => {
            // console.log(err)
          })
 
      }
    },

    listAnswer() {
      this.$axios.$get(`api/admin/answers/list/${this.id}`)
      .then( res => {
        console.log(res.result)
        this.lists = res.result
      })
    },

    showCategory() {
      this.$store.dispatch('category/show',{
        id : this.category_Id
      })
      .then(res=> {
        console.log(res)
      })
    },

    showAnswer() {
      this.$store.dispatch('question/show', {
        name : this.Questions_Name,
        id: this.id,
      })
        .then (res => {
          this.Questions_Name = res.text;
        })
    },

    showQuestion() {
      this.$store.dispatch('question/show', {
        id: this.Question_Id
      })
      .then(res => {
        this.Question_Id = res.result.id
        console.log(res.result.id)
      })
    },

    deleteAnswers(id) {
      this.$axios.delete(`/api/admin/answers/delete/${this.Question_Id}/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
        })
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    }
  }
}
</script>

<style scoped>

</style>
