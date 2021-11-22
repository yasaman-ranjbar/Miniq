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
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'داشبورد',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'مدیریت کاربران',
          to: '/users'
        },
        {
          icon: 'mdi-book-multiple',
          title: 'دسته بندی ها',
          to: '/category'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'مینی کیو'
    }
  },

  methods:{
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
