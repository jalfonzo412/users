<script>
export default {
  data () {
    return {
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ]
    }
  }
}
</script>

<template>
  <v-card class="footer">
    <v-row justify="center" align="center" no-gutters>
      <div class="titulo">
        <v-icon>
          mdi-dog
        </v-icon>
        Ani-mania
      </div>
      <v-card-actions>
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          size="small"
          rounded="xl"
        >
          {{ link }}
        </v-btn>
      </v-card-actions>
      <div class="vertical-line" />
      <v-card-actions>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          variant="plain"
          size="small"
        />
      </v-card-actions>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Ani-mania</strong>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.footer {
  background-color: rgb(254, 74, 8);
  padding: 20px;
  color: white;
}

.vertical-line {
  width: 1px;
  height: 20px;
  background-color: white;
  margin: 0 10px;
}

.titulo{
  font-family: Quicksand;
  font-weight: 700;
}
</style>
