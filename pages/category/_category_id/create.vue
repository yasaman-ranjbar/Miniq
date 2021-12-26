<template>
  <div>
    <v-alert
      border="left"
      color="pink darken-1"
      dark
    >
      افزودن سوال تکی
<!--      <img :src="category_Icon" alt="" width="30">{{ categoryForm.item.name }}-->
    </v-alert>

        <!--وارد کردن سوالات--------------------------------------------------------------->
    <v-card>
      <v-card-text>
        <v-row class="mt-5">
          <v-col cols="7" >
            <v-form @submit.prevent="createQuestion">
              <v-select
                v-model="questionForm.value"
                :items="questionForm.item"
                item-text="name"
                item-value="id"
                label="انتخاب دسته بندی"
                outlined
              >
                <template #selection="{ item }">
                  <v-chip color="pink">{{item.name}}</v-chip>
                </template>
              </v-select>
              <v-text-field
                label="سوال"
                outlined
                v-model="questionForm.text"
                color="primary"
              >
              </v-text-field>
              <v-btn
                type="submit"
                color="pink darken-1"
                dark
                large
              >
                ثبت سوال
              </v-btn>
            </v-form>


            <!----------------------------------------------------------------وارد کردن جوابها-->
            <v-row class="mt-5" v-if="question_id">
              <v-col cols="6">
                <v-form @submit.prevent="createForm">
                  <v-text-field
                    :value="form.is_correct"
                    label="جواب درست"
                    outlined
                    v-model="form.text"
                    color="green"
                    prepend-inner-icon="mdi-check-bold"
                  >
                  </v-text-field>
                </v-form>
                <v-form @submit.prevent="createForm1">
                  <v-text-field
                    :value="form1.is_correct"
                    label="جواب اشتباه"
                    outlined
                    v-model="form1.text"
                    color="red"
                    prepend-inner-icon="mdi-close-thick"
                  >
                  </v-text-field>
                </v-form>
                <v-form @submit.prevent="createForm2">
                  <v-text-field
                    :value="form2.is_correct"
                    label="جواب اشتباه"
                    outlined
                    v-model="form2.text"
                    color="red"
                    prepend-inner-icon="mdi-close-thick"
                  >
                  </v-text-field>
                </v-form>
                <v-form @submit.prevent="createForm3">
                  <v-text-field
                    :value="form3.is_correct"
                    label="جواب اشتباه"
                    outlined
                    v-model="form3.text"
                    color="red"
                    prepend-inner-icon="mdi-close-thick"
                  >
                  </v-text-field>
                </v-form>
              </v-col>

              <v-col cols="6">
                <v-form @submit.prevent="createForm4">
                  <v-text-field
                    :value="form4.is_correct"
                    label="جواب اشتباه"
                    outlined
                    v-model="form4.text"
                    color="red"
                    prepend-inner-icon="mdi-close-thick"
                  >
                  </v-text-field>
                </v-form>
                <v-form @submit.prevent="createForm5">
                  <v-text-field
                    :value="form5.is_correct"
                    label="جواب اشتباه"
                    outlined
                    v-model="form5.text"
                    color="red"
                    prepend-inner-icon="mdi-close-thick"
                  >
                  </v-text-field>
                </v-form>
                <v-form @submit.prevent="createForm6">
                  <v-text-field
                    :value="form6.is_correct"
                    label="جواب اشتباه"
                    outlined
                    v-model="form6.text"
                    color="red"
                    prepend-inner-icon="mdi-close-thick"
                  >
                  </v-text-field>
                </v-form>
                <v-form @submit.prevent="createForm7">
                  <v-text-field
                    :value="form7.is_correct"
                    label="جواب اشتباه"
                    outlined
                    v-model="form7.text"
                    color="red"
                    prepend-inner-icon="mdi-close-thick"
                  >
                  </v-text-field>
                </v-form>
              </v-col>

              <v-btn
                @click="submit"
                color="pink darken-1"
                dark
                large
              >
                ثبت جواب
              </v-btn>
            </v-row>
          </v-col>
          <!--نمایش سوالات و جوابها--------------------------------------------------------------->
          <v-col cols="4">
            <v-card
              class="mx-auto"
              max-width="500"
              outlined
              v-if="questionStatus"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title  class="mt-5">
                    <p class="mb-4 mr-5 mt-5">
                      {{ questionForm.text }}
                    </p>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-row>
                  <v-col cols="6">
                    <v-chip
                      dark
                      v-if="form.text"
                      v-model="form.text"
                      class="ma-2"
                      color="green darken-3"
                    >
                      {{ form.text }}
                    </v-chip>
                    <v-chip
                      dark
                      v-if="form1.text"
                      v-model="form1.text"
                      class="ma-2"
                      color="red darken-4"
                    >
                      {{ form1.text }}
                    </v-chip>
                    <v-chip
                      dark
                      v-if="form2.text"
                      v-model="form2.text"
                      class="ma-2"
                      color="red darken-4"
                    >
                      {{ form2.text }}
                    </v-chip>
                    <v-chip
                      dark
                      v-if="form3.text"
                      v-model="form3.text"
                      class="ma-2"
                      color="red darken-4"
                    >
                      {{ form3.text }}
                    </v-chip>
                  </v-col>
                  <v-col cols="6">
                    <v-chip
                      dark
                      v-if="form4.text"
                      v-model="form4.text"
                      class="ma-2"
                      color="red darken-4"
                    >
                      {{ form4.text }}
                    </v-chip>
                    <v-chip
                      dark
                      v-if="form5.text"
                      v-model="form5.text"
                      class="ma-2"
                      color="red darken-4"
                    >
                      {{ form5.text }}
                    </v-chip>
                    <v-chip
                      dark
                      v-if="form6.text"
                      v-model="form6.text"
                      class="ma-2"
                      color="red darken-4"
                    >
                      {{ form6.text }}
                    </v-chip>
                    <v-chip
                      dark
                      v-if="form7.text"
                      v-model="form7.text"
                      class="ma-2"
                      color="red darken-4"
                    >
                      {{ form7.text }}
                    </v-chip>
                  </v-col>

                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>



  </div>
</template>

<script>
export default {
  data() {
    return {
      questionStatus: false,
      category_Icon: '',
      category_Name: '',
      // category_id: this.$route.params.category_id,
      question_id: '',


      questionForm: {
        text: '',
        value : [],
        item: [],
      },

      form: {
        text: "",
        is_correct: 1,
      },

      form1: {
        text: "",
        is_correct: 0,
      },
      form2: {
        text: "",
        is_correct: 0,
      },
      form3: {
        text: "",
        is_correct: 0,
      },
      form4: {
        text: "",
        is_correct: 0,
      },
      form5: {
        text: "",
        is_correct: 0,
      },
      form6: {
        text: "",
        is_correct: 0,
      },
      form7: {
        text: "",
        is_correct: 0,
      },

    }
  },

  created() {
    this.categoryList();
  },

  methods: {
    categoryList() {
      this.$store.dispatch('category/list' , {
        page: this.questionForm.value,
      })
        .then(res=> {
          this.questionForm.item = res.data
        })
    },


    createQuestion() {
      this.$store.dispatch('question/create' , {
        text: this.questionForm.text,
        category_id: this.questionForm.value
      })
      .then( res  => {
        this.question_id = res.id
        this.questionStatus = true
      })
    },

    submit() {
      if (this.form.text && this.form1.text && this.form2.text && this.form3.text) {
        this.createForm();
        this.createForm1();
        this.createForm2();
        this.createForm3();
      } else {
        window.alert('حتما باید چهار جواب وارد کند')
      }
      if (this.form4.text) {
        this.createForm4();
      }
      if(this.form5.text) {
        this.createForm5();
      }
      if (this.form6.text) {
        this.createForm6();
      }
      if (this.form7.text) {
        this.createForm7();
      }
    },
    createForm() {
      // console.log(this.form)
      this.$store.dispatch('answer/create',{
        text: this.form.text,
        is_correct: this.form.is_correct,
        Question_Id : this.question_id
      })
      .then(({data})=> {
        console.log(data)
      })
    },

    createForm1() {
      this.$store.dispatch('answer/create',{
        text: this.form1.text,
        is_correct: this.form1.is_correct,
        Question_Id : this.question_id
      })
        .then(({data})=> {
          console.log(data)
        })
    },

    createForm2() {
      this.$store.dispatch('answer/create',{
        text: this.form2.text,
        is_correct: this.form2.is_correct,
        Question_Id : this.question_id
      })
        .then(({data})=> {
          console.log(data)
        })
    },

    createForm3() {
      this.$store.dispatch('answer/create',{
        text: this.form3.text,
        is_correct: this.form3.is_correct,
        Question_Id : this.question_id
      })
        .then(({data})=> {
          console.log(data)
        })
    },

    createForm4() {
      this.$store.dispatch('answer/create',{
        text: this.form4.text,
        is_correct: this.form4.is_correct,
        Question_Id : this.question_id
      })
        .then(({data})=> {
          console.log(data)
        })
    },

    createForm5() {
      this.$store.dispatch('answer/create',{
        text: this.form5.text,
        is_correct: this.form5.is_correct,
        Question_Id : this.question_id
      })
        .then(({data})=> {
          console.log(data)
        })
    },

    createForm6() {
      this.$store.dispatch('answer/create',{
        text: this.form6.text,
        is_correct: this.form6.is_correct,
        Question_Id : this.question_id
      })
        .then(({data})=> {
          console.log(data)
        })
    },

    createForm7() {
      this.$store.dispatch('answer/create',{
        text: this.form7.text,
        is_correct: this.form7.is_correct,
        Question_Id : this.question_id
      })
        .then(({data})=> {
          console.log(data)
        })
    },

  }
}
</script>

<style>

</style>
