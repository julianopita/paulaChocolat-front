<script setup>
import HeroSection from '~/components/HeroSection.vue';
import Testimonials from '~/components/Testimonials.vue';
import Login from '~/components/Login.vue'; // Importando o componente Login
</script>

<template>
  <div>    
    <Login apiEndpoint="http://localhost:3000"/>    
  </div>
</template>

<style src="../assets/css/style.css"></style>
