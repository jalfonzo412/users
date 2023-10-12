<script setup>
const drawer = ref(false)

const closeOpenDrawer = () => {
  drawer.value = !drawer.value
}

const items = [
  { title: 'Profile', icon: 'mdi-account', value: 1 },
  { title: 'Settings', icon: 'mdi-cog', value: 2 }
]
</script>

<template>
  <v-card style="z-index: 3">
    <v-layout>
      <v-toolbar class="header">
        <v-icon class="ml-2">
          mdi-dog
        </v-icon>

        <v-toolbar-title
          style="font-family: Quicksand;
          font-weight: 700;"
        >
          Ani-mania
        </v-toolbar-title>

        <v-spacer />

        <div style="font-family: Oswald;">
          <v-btn
            stacked
            variant="text"
            @click.stop="closeOpenDrawer"
          >
            <v-icon icon="mdi-account-circle-outline" />
          </v-btn>
        </div>
      </v-toolbar>
      <v-navigation-drawer
        v-model="drawer"
        location="right"
        permanent
        class="sidebar"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-icon="mdi-account-circle"
            title="User"
            subtitle="Logged in"
          />
        </template>

        <v-divider />

        <v-list density="compact" nav>
          <div v-for="(item, i) in items" :key="i">
            <v-list-item
              :prepend-icon="item.icon"
              :title="item.title"
              :value="item.value"
              rounded="x1"
            />
          </div>
        </v-list>

        <div class="pa-2">
          <v-btn
            block
            class="bottom-logout"
          >
            LOGOUT
          </v-btn>
        </div>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<style scoped>
.header{
  background-color: #FF5722;
  color: white;
  position: fixed !important;
}

.sidebar{
  height: 220px !important;
  margin-top: 64px !important;
}

.bottom-logout{
  background: #FF5722;
  color: white;
}
</style>
