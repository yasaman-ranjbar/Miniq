<template>
  <Shop
    :form="form"
    :loading="loading"
    :edit="edit"
    @addPremiumAvatar="addPremiumAvatar"
  />
</template>

<script>
import Shop from "@/components/Shop/Shop"
export default {
  name: "shop",
  comments: {Shop},

  data() {
    return {
      form: {
        title:"",
        icon_file: [],
        type: ['elixir', 'gem' , 'charge'],
        items: ['اکسیر', 'الماس' , 'شارژ'],
        price: "",
        amount: "",
        description: "",
      },

      loading: false,
      edit: false,
    }
  },

  methods:{
    addPremiumAvatar() {

    }
  }
}
</script>

<style scoped>

</style>
