<template>
  <div>
    <Setting 
    :form="form"
    :loading="loading"
    @addVersion="addVersion"
    />
    <v-data-table class="mt-4" :headers="headers" :items="lists" hide-default-footer>
    <template v-slot:item="row" >
      <tr>
        <td>{{row.item.version_code}}</td>
        <td>
          {{row.item.is_force ? 'روشن' : 'خاموش'}}
          </td>
      </tr>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import Setting from '~/components/Setting.vue'
export default {
  components: { Setting },

  data() {
    return {
      form:{
        is_force: false,
        version_code: ''
      },

      loading:false,

      headers:[
        {
          text: 'کد ورژن',
          value: '',
          align:'right',
        },
        {
          text: 'وضعیت',
          value: '',
          align:'right',
        },
      ],

      lists: [],
    }
  },

  created() {
    this.versionList();
  },

  methods: {
    addVersion() {
        this.$store.dispatch('setting/create' , {
          version_code : this.form.version_code,
          is_force : this.form.is_force
        })
        .then(res => {
          this.versionList();
        })
        this.form = "";
    },

    versionList() {
      this.$store.dispatch('setting/list')
      .then( res => {
        this.lists.push(res)
      })
    }
  }
}
</script>

<style>

</style>