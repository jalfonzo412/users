<template>
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
      <v-btn stacked to="/">
        Home
      </v-btn>

      <v-btn stacked to="/shop">
        <v-badge
          dot
          color="white"
        >
          <v-icon icon="mdi-cart-outline" />
        </v-badge>
        Shop
      </v-btn>

      <v-btn
        stacked
        variant="tonal"
      >
        <v-icon icon="mdi-login" />
        Login
      </v-btn>
    </div>
  </v-toolbar>
</template>

<style scoped>
.header{
  background-color: rgb(254, 74, 8);
  color: white;
}
</style>
