<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <Header />
  <div class="container">
    <slot />
  </div>
  <footer>
    {{ new Date().getFullYear() }} — <strong>Ani-mania</strong>
  </footer>
</template>

<style>
    body {
      margin: 0 !important;
    }
    footer {
      margin-top: 35px;
      text-align: center;
      margin-bottom: 40px;
    }
    .container {
      margin-top: 69px;
    }
</style>
