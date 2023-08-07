<script lang="ts" setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <Header />
  <div class="container">
    <slot />
  </div>
  <Footer />
</template>

<style>
    body {
        margin: 0 !important;
    }
</style>
