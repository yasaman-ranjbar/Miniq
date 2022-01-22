<template>
  <div>
    <v-card class="mx-auto" >
      <v-card-title>اطلاعات کاربر</v-card-title>

      <v-row v-if="users">
        <v-col md="4">
          <v-card class="ma-5 py-3" outlined >
            <v-list-item three-line>
              <v-list-item-avatar tile size="80">
                <v-img
                  :src="users.avatar"
                ></v-img>
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

          <v-card class="ma-5" flat>
            <v-btn  block color="pink" @click="resultUser">
               نمایش لیست نتایج کاربر
            </v-btn>
          </v-card>
        </v-col>

        <v-col md="4">
          <v-card class="ma-5" outlined>
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

          <v-card class="ma-5" flat>
            <v-btn  block color="pink" @click="discount">
               نمایش لیست کد تخفیف کاربر
            </v-btn>
          </v-card>
        </v-col>

        <v-col  md="4">
          <v-card class="ma-5" outlined>
            <v-row>
              <v-col class="my-2" md="6" sm="12" align="center">
                <v-chip
                  class="ma-2"
                  text-color="white"
                  color="green"
                >
                  <v-icon left>
                    mdi-thumb-up
                  </v-icon>
                   بازی های برنده: {{ users.winner_count}}
                </v-chip>
              </v-col>
              <v-col class="my-2" md="6" sm="12" align="center">
                <v-chip
                  class="ma-2"
                  text-color="white"
                  color="red"
                >
                  <v-icon left>
                    mdi-thumb-down
                  </v-icon>
                  بازی های باخته: {{ users.looser_count}}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="my-2" md="12" align="center">
                <v-chip
                  text-color="white"
                  color="light-blue darken-1"
                >
                  <v-icon left>
                    mdi-sim
                  </v-icon>
                  شارژ : {{ totalCharge}} تومان
                </v-chip>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="ma-4" flat>
            <v-btn block color="pink" @click="giftCard">
             نمایش لیست شارژ کاربر
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!--لیست نتایج کاربران----------------------------------------------------------------->
    <template v-if="showResult">
      <v-simple-table class="mt-6">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center">آیکون</th>
            <th class="text-center">دسته بندی</th>
            <th class="text-center">تعداد سوالات درست</th>
            <th class="text-center">تعداد سوالات اشتباه</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in lists" :key="item.name">
            <td class="text-center">
              <img :src="item.category_icon" alt="" width="30"/>
            </td>
            <td class="text-center">{{ item.category_name }}</td>
            <td class="text-center">
              <v-chip
                class="ma-2"
                color="green"
                text-color="black"
              >
                {{ item.true_count }}
              </v-chip>
            </td>
            <td class="text-center">
              <v-chip
                class="ma-2"
                color="red"
                text-color="white"
              >
                {{ item.false_count }}
              </v-chip>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <!--لیست کد تخفیف کاربران----------------------------------------------------------------->
    <template v-if="showCode">
      <v-simple-table class="mt-6">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center">کد تخفیف</th>
            <th class="text-center">لینک وب سایت</th>
            <th class="text-center">توضیحات</th>
            <th class="text-center">تاریخ انقضا</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in code" :key="item.code">
            <td class="text-center">{{ item.code }}</td>
            <td class="text-center"><a :href="`http://${item.link}`" target="_blank" > {{ item.link }} </a> </td>
            <td class="text-center">{{ item.description }}</td>
            <td class="text-center">{{ $moment(item.expired_at).format('jYYYY/jM/jDD') }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <!--لیست شارژ کاربران----------------------------------------------------------------->
    <template v-if="showCharge">
      <v-simple-table class="mt-6">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center">ردیف</th>
            <th class="text-center">شناسه</th>
            <th class="text-center">شناسه کاربر</th>
            <th class="text-center">مقدار شارژ</th>
            <th class="text-center">اپراتور</th>
            <th class="text-center">شناسه تراکنش</th>
            <th class="text-center">شماره تراکنش</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in charge" :key="item.charge">
            <td class="text-center">{{ item.index }}</td>
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.user_id }}</td>
            <td class="text-center">{{ item.amount }}</td>
            <td class="text-center">{{ item.operator }}</td>
            <td class="text-center">{{ item.transaction_id }}</td>
            <td class="text-center">{{ item.tracking_number }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
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
export default {
  name: 'index',

  data() {
    return {
      ids: {
        user_id: this.$route.params.id,
      },
      img: require('~/static/user-avatar.png'),
      users: [],
      temp: [
        {
          rating: 4,
          elixirImage: require(`@/assets/images/exir.png`),
          gemImage: require('@/assets/images/gem.png'),
        },
      ],

      lists: [],
      code: [],
      charge: [],

      page: 1,
      last_page: 0,

      showResult: false,
      showCode: false,
      showCharge: false,

      totalCharge : "",
    }
  },


  created() {
    this.getDiscountCodeList();
    this.getUser();
    this.getChargeList();
  },

  methods: {
    getUser() {
      this.$axios
        .$get(`api/admin/users/show/${this.ids.user_id}`)
        .then((res) => {
          this.users = res.result
          this.lists = res.result.result
        })
    },

    getDiscountCodeList() {
      this.$axios
        .$get(`api/admin/users/show/${this.ids.user_id}/code/list`)
        .then(res => {
          this.code = res.result.data
          this.last_page = res.result.last_page
        })
    },

    getChargeList() {
      this.$axios
        .$get(`api/admin/users/show/${this.ids.user_id}/charge/list?page=${this.last_page}`)
        .then(res => {
          this.charge = res.result.data
          this.last_page = res.result.last_page
          this.totalCharge = (res.result.total) * 1000
        })
    },

    resultUser() {
      this.showResult = !this.showResult;
      if (this.showCode || this.showCharge) {
        this.showCode = false
        this.showCharge = false
      }
      setTimeout(this.getUser, 1)
    },

    discount() {
      this.showCode = !this.showCode;
      if (this.showResult || this.showCharge) {
        this.showResult = false
        this.showCharge = false
      }
      setTimeout(this.getDiscountCodeList, 1)
    },

    giftCard() {
      this.showCharge = !this.showCharge;
      if (this.showResult || this.showCode) {
        this.showResult = false
        this.showCode = false
      }
      setTimeout(this.getChargeList, 1)
    },
  },
}
</script>

<style scoped>
</style>
