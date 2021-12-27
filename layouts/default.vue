<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      right
    >
      <template v-slot:prepend>

        <v-row
          align="center"
          class="spacer py-4"
          no-gutters
        >
          <v-col
            sm="2"
            class="col-lg-3 px-3"
          >
            <v-img
              :src="iconPrepend"
              alt="miniq"
              width="60"
              class="iconPrepend"
            >
            </v-img>
          </v-col>
          <v-col
            class="hidden-xs-only  col-lg-9 "
            sm="5"
            md="3"
          >
            مینی کیو
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <template v-for="(item, i) in menus">
        <v-list-group
          v-if="item.items"
          :key="item.name"
          :group="item.group"
          :prepend-icon="item.icon"
        >
          <v-list-item slot="activator" ripple="ripple" router exact >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-group>
        <v-subheader v-else-if="item.header" :key="i">
          {{ item.header}}
          </v-subheader>
        <v-divider v-else-if="item.divider" :key="i"></v-divider>
        <v-list-item
          v-else
          :to="item.href ? item.href : null"
          :key="item.name"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>


      <v-toolbar-title v-text="title" />
      <v-spacer />

      <template>
        <div class="ml-4">
            {{ this.$auth.user.fullname }} عزیز خوش آمدید
        </div>
      </template>


      <template>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                color="pink"
                v-bind="attrs"
                v-on="on"
                fab
                small
                class="ml-6"
              >
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                link
              >
                <v-list-item-title @click="logout">خروج</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

    </v-app-bar>


    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware:'isLogin',
  data () {
    return {
      userName: '',
      clipped: false,
      drawer: false,
      fixed: false,
      menus: [
        { header: "داشبورد" },
        {
          title: "داشبورد",
          group: "داشبورد",
          icon: "mdi-apps",
          name: "Dashboard",
          href: "/",
        },
        { divider: true },
        { header: "مدیریت کاربران" },
        {
          title: "کاربران",
          group: "کاربران",
          icon: "mdi-account",
          name: "users",
          href: "/users",
        },
        { divider: true },
        { header: "مدیریت بازی" },
        {
          title: "دسته بندی ها",
          group: "category",
          name: "category",
          icon: "mdi-book-multiple",
          href: "/category",
        },
        {
          title: "افزودن سوال تکی",
          group: "question",
          name: "question",
          icon: "mdi-chat-question",
          href: "/category/category_id/create",
        },
        {
          title: "آپلود گروهی سوالات",
          group: "upload",
          name: "upload",
          icon: "mdi-cloud-upload",
          href: "/category/upload",
        },
        {
          title: "افزودن تورنومنت",
          group: "tornoment",
          name: "tornoment",
          icon: "mdi-account-group",
          href: "/tornoment",
        },
        {
          title: "افزودن صدا",
          group: "voice",
          name: "voice",
          icon: "mdi-account-voice",
          href: "/voice",
        },
        { divider: true },
        { header: "سرویس تخفیف" },
        {
          title: "ارائه دهندگان تخفیف",
          group: "discount",
          name: "company",
          icon: "mdi-domain",
          href: "/company",
        },
        {
          title: "کد تخفیف",
          group: "discount",
          name: "gift",
          icon: "mdi-sale",
          href: "/gift",
        },
        {
          title: "آپلود تخفیف",
          group: "discount",
          name: "uploadGift",
          icon: "mdi-file-upload",
          href: "/gift/upload",
        },
        { divider: true },
        { header: "گزارشات" },
        {
          title: "گزارش بازی",
          group: "report",
          name: "report",
          icon: "mdi-chart-bar",
          href: "/report",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'مینی کیو',
      iconPrepend: require('@/assets/images/logo.jpg'),
    }
  },

  methods:{
    logout() {
      this.$auth.logout()
    },

    user() {
        return this.$auth.$storage.getUniversal('user');
      }
  },

  created() {
    this.user();
  }
}
</script>

<style scoped>
.iconPrepend {
  border: 1px transparent solid;
  border-radius: 10px;
}
</style>
