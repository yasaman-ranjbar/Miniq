<template>
<div>
  <Notification
    :form="form"
    @addNotification="addNotification"
  />
  <v-snackbar
    v-model="snackbar"
    :vertical="vertical"
    top
    color="red"
    timeout="-1"
  >
    <h3 class="v-snack__wrapper">{{ text }}</h3>

    <div class="btnalign">
      <v-btn
        color="white"
        text
        @click="sendNotification"
      >
        تایید
      </v-btn>
      <v-btn
        color="white"
        text
        @click="disagree"
      >
        انصراف
      </v-btn>
    </div>
  </v-snackbar>

</div>
</template>

<script>
import Notification from "@/components/Notification"
export default {
  name: "notification",
  comments: {Notification},

  data() {
    return {
      form: {
        title: "",
        body: "",
      },
      vertical: true,
      snackbar:false,
      text: 'آیا از ارسال پیام مطمئن هستید؟',
    }
  },

  methods: {
    addNotification() {
      this.snackbar = true
    },

    disagree() {
      this.snackbar = false;
        this.form = "";
    },

    sendNotification() {
      this.$axios.post('api/admin/settings/send_push_all' , this.form)
      .then (res => {
        this.snackbar = false
        this.form = "";
      })
    }
  },


}
</script>

<style scoped>
.btnalign {
  display: flex;
  justify-content: center;
}
</style>
