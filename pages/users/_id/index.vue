<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-card-title>اطلاعات کاربر</v-card-title>


        <v-row v-if="users">
          <v-col cols="4">
            <v-card
              class="ma-5"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-avatar
                  tile
                  size="80"
                >
                  <v-img :src="users.avatar = null ? 'img' : 'users.avatar'"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="mb-1">
                    نام کاربر: {{ users.fullname }}
                  </v-list-item-title>
                  <v-list-item-title class="mb-1">
                    شماره موبایل: {{ users.mobile }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="ma-5"
              outlined
            >
              <v-row>
                <v-col class="my-10" cols="6" align="center">
                  <v-img :src="temp[0].elixirImage" width="30"></v-img>
                  <span>اکسیر : {{ users.elixir }} </span>
                </v-col>
                <v-col class="my-10" cols="6" align="center">
                  <v-img :src="temp[0].gemImage" width="30"></v-img>
                  <span> الماس : {{ users.gem }}</span>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="ma-5"
              outlined
            >
              <v-row>
                <v-col cols="12" class="mt-5" align="center">
                  امتیاز کاربر: {{ users.rank }}
                </v-col>
                <v-col cols="12" class="mb-5" align="center">
                  <v-rating
                    align="center"
                    v-model="temp[0].rating"
                    background-color="pink lighten-3"
                    color="pink"
                    large
                  ></v-rating>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

    </v-card>
    <!--  <Profile-->
    <!--    :mobile="mobile"-->
    <!--    :fullname="fullname"-->
    <!--    :avatar="avatar"-->
    <!--    :elixir="elixir"-->
    <!--    :gem="gem"-->
    <!--    :rank="rank"-->
    <!--  />-->
  </div>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      ids: {
        user_id: this.$route.params.id
      },
      img: require('@/assets/images/user-avatar.png') ,
      users: {},
      temp: [
        {
          rating: 4,
          elixirImage: require(`@/assets/images/exir.png`),
          gemImage: require('@/assets/images/gem.png')
        }
      ]
    }
  },

  created() {
    this.getUser();
  },

  methods: {
    getUser() {
      this.$axios.$get(`api/admin/users/show/${this.ids.user_id}`)
        .then(res => {
          this.users = res.result;
        })
    },
  }
}
</script>

<style scoped>


</style>
