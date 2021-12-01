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
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="my-3"
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
        },
        {
          icon: 'mdi-account-group',
          title: 'تورنومنت',
          to: '/tornoment'
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
    }
  }
}
</script>

<style scoped>
.iconPrepend {
  border: 1px transparent solid;
  border-radius: 10px;
}
</style>
