<template>
<div>
  <Voice
    :form="form"
    :loading="loading"
    :edit="edit"
    @addVoice="addVoice"
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
        <td>{{row.item.name}}</td>
        <td><v-icon @click="playVoice(row.item.voice)" color="red accent-3">mdi-arrow-right-drop-circle</v-icon></td>
        <td>
          <v-icon @click="deleteList(row.item.id)" color="red accent-3">mdi-delete</v-icon>
          <v-icon @click="goEdit(row.item.id)" color="light-blue accent-2">mdi-pencil</v-icon>
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
import Voice from "~/components/Voice";
export default {
  name: "index",
  components: {Voice},

  data() {
    return {
      form: {
        voice_file: []
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
          text: 'نام صدا',
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

      lists: [],

      page: 1,
      last_page: 0,

      itemPage: 15,
    }
  },

  watch: {
    page() {
      this.voiceList();
    }
  },

  created() {
    this.voiceList();
  },

  methods: {
    addVoice() {
      this.loading = true
      this.$store.dispatch( this.edit ? 'voice/update' : 'voice/create' ,{
        voice_file: this.form.voice_file,
        name: this.form.name
      })
        .then(res => {
          if (res) {
            this.loading = false;
            this.voiceList();
          } else {
            this.loading = false;
          }
        });
      this.form = '';
    },

    goEdit(item) {
      this.edit = true
      this.form = item
    },

    voiceList() {
      this.$store.dispatch('voice/list',{
        page: this.page,
      })
        .then(res=> {

          this.lists = res.data;
          this.last_page = res.last_page
        })
    },

    deleteList(id) {
      this.$axios.delete(`/api/admin/settings/voice/delete/${id}`)
        .then( res => {
          this.lists.splice(id , 1);
        })
    },

    playVoice(voice) {
      const audio = new Audio(voice)
      audio.play();
    },
  }
}
</script>

<style scoped>

</style>
