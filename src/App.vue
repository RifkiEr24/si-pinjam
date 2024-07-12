<template>
  <navbar />
  <div class="bg-slate-100 min-h-[100vh] py-10">
    <RouterView />
  </div>
  
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>
