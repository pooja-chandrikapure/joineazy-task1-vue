<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>
