<template>
  <div>
    <v-alert
      border="left"
      color="pink darken-1"
      dark
    >
      <v-row align="center">
        <v-col class="grow">
          <img :src="category_Icon" alt="" width="30">  {{ category_Name }}
        </v-col>
        <v-col class="shrink">
          <v-btn @click="createQuestion">
            ثبت سوال
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <Questions
      v-if="edit"
      :form="form"
      :category_id="category_id"
      :loading="loading"
      :edit="edit"
      @editQuestion="editQuestion"
    />

    <v-data-table class="mt-4"
      :headers="headers"
      :items="questions"
      hide-default-footer
      :items-per-page = "itemPages"
    >
      <template v-slot:item="row" >
        <tr>
          <td>{{row.item.text}}</td>
           <td><v-icon @click="playVoice(row.item.voice)" color="red accent-3">mdi-arrow-right-drop-circle</v-icon></td>
          <td>
            <v-icon @click="deleteQuestion(row.item.id)" color="red accent-3">mdi-delete</v-icon>
            <v-icon @click="goEdit(row.item)" color="light-blue accent-2">mdi-pencil</v-icon>
            <v-icon @click="addAnswer(row.item.id)" color="light-green accent-4">mdi-plus-circle</v-icon>
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
          text: 'پخش صدا',
          value:'id',
          align:'right',
        },
        {
          text: 'عملیات',
          value:'id',
          align:'right',
        },
      ],
      edit: false,
      questions:[],
      form: {
        text:'',
        voice_file: [],
      },
      voice:'',
      category_id: this.$route.params.category_id,
      loading:false,
      category_Name: '',
      category_Icon: '',

      page: 1,
      last_page: 0,
      itemPages: 15,
    }
  },

  created() {
    this.questionsList();
    this.showCategory();
  },

  watch: {
    page() {
      this.questionsList();
    }
  },

  methods:{
    editQuestion(id) {
      this.edit = true;
      this.$store.dispatch('question/update' , {
        text: this.form.text,
        voice_file: this.form.voice_file,
        id: this.form.id
      })
        .then(res => {
          if (res) {
            this.loading = false;
            this.questionsList();
          } else {
            this.loading = false;
          }
        });
          this.form = '';
    },
    // createQuestion() {
    //   this.loading = true
    //   this.$store.dispatch( this.edit ? 'question/update' : 'question/create' ,{
    //     text: this.form.text,
    //     id: this.form.id,
    //     category_id: this.category_id,
    //   })
    //     .then(res => {
    //       if (res) {
    //         this.loading = false;
    //         this.questionsList();
    //       } else {
    //         this.loading = false;
    //       }
    //     });
    //   this.form.text = '';
    // },

    questionsList() {
      this.$store.dispatch('question/list',{
        page: this.page,
        category_id : this.category_id
      })
      .then(res=> {

        this.questions = res.data;
       this.last_page = res.last_page
      })
    },

    deleteQuestion(id) {
      this.$axios.delete(`/api/admin/questions/delete/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
          this.questionsList();
        })
    },

    addAnswer(id) {
      this.$router.push(`${this.category_id}/${id}`)
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
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    },

    playVoice(voice) {
      const audio = new Audio(voice)
      audio.play();
    },

    createQuestion() {
      this.$router.push({ name: 'category-category_id-create'})
    }
  }
}
</script>

<style scoped>

</style>
