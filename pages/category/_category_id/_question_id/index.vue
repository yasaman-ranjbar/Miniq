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
  <v-data-table class="mt-4" :headers="headers" :items="lists" hide-default-footer>
    <template v-slot:item="row" >
      <tr>
        <td>
          <v-icon :color="row.item.is_correct == 1 ? 'light-green accent-4' : 'red accent-4'">
            {{ row.item.is_correct == 1 ? 'mdi-check-circle' : 'mdi-close-circle'}}
          </v-icon>
        </td>
        <td>{{row.item.text}}</td>
        <td><v-icon @click="playSound( row.item.voice )" color="red accent-3">mdi-arrow-right-drop-circle</v-icon></td>
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
        text: '',
        voice_file: [],
      },

      voice: '',
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
          text: 'پخش صدا',
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
      answers_Id: '',
    }
  },

  created() {
    this.listAnswer();
    this.showAnswer();
  },


  methods:{
    addAnswer() {
      this.loading = true
      this.$store.dispatch( this.edit ? 'answer/update' : 'answer/create' ,{
        text: this.form.text,
        is_correct: this.form.is_correct,
        Question_Id : this.Question_Id,
        voice_file: '',
        id : this.form.id,
      })
        .then(res => {
          if (res) {
            this.loading = false;
            this.listAnswer();
          } else {
            this.loading = false;
          }
        });
      this.form.text = '';
    },

    listAnswer() {
      this.$axios.$get(`api/admin/answers/list/${this.id}`)
      .then( res => {
        this.lists = res.result
      })
    },

    showCategory() {
      this.$store.dispatch('category/show',{
        id : this.category_Id
      })
      .then(res=> {
        return res
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
      // this.$store.dispatch("answer/delete", {
      //     Question_Id : this.id,
      //     id: id
      // })
      //   .then((res) => {
      //     if (res) {
      //       this.listAnswer({
      //         page: this.page,
      //       });
      //     }
      //   });
      // this.$store.dispatch('question/delete', {
      //   Question_Id : this.Question_Id,
      //   id: this.form.id,
      // })
      //   .then (res => {
      //     this.lists.splice(res , 1);
      //   })
      this.$axios.delete(`/api/admin/answers/delete/${this.Question_Id}/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
        })
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    },

    playSound (voice) {
      console.log(voice)
      const audio = new Audio(voice)
      audio.play();
    }
  }
}
</script>

<style scoped>

</style>
