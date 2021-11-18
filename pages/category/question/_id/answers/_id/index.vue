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
    @addAnswer="addAnswer"
  />
  <v-data-table class="mt-4" :headers="headers" :items="lists">
    <template v-slot:item="row" >
      <tr>
        <td>
          <v-icon :color="row.item.is_correct ? 'green' : 'red'">
            {{ row.item.is_correct ? 'mdi-check-circle' : 'mdi-close-circle'}}
          </v-icon>
        </td>
        <td>{{row.item.text}}</td>
        <td>
          <v-icon @click="deleteAnswers(row.item.id)" color="red">mdi-delete</v-icon>
          <v-icon @click="goEdit(row.item.id)" color="blue">mdi-pencil</v-icon>
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

      id: this.$route.params.id,

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

      lists: [],

      Questions_Name: '',
      category_Id : '',
    }
  },

  created() {
    this.listAnswer();
    this.showAnswer();
    this.showCategory();
  },

  methods:{
    addAnswer() {
      this.$axios.post(`api/admin/answers/create/${this.id}`, this.form)
      .then( res => {
        return res
      })
      .catch(err => {
        console.log(err)
      })
      this.form.is_correct = ""
      this.form.text = ''
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



    deleteAnswers(id) {
      // this.$axios.delete(`/api/admin/questions/delete//${this.id}`)
      //   .then( res => {
      //
      //     // this.lists.splice(id , 1);
      //   })
    }
  }
}
</script>

<style scoped>

</style>
