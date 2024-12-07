<script setup>
import HeroSection from '~/components/HeroSection.vue';
import Testimonials from '~/components/Testimonials.vue';
import Cadastro from '~/components/Cadastro.vue'; // Importando o componente Login
</script>

<template>
  <div>    
    <Cadastro apiEndpoint="http://localhost:3000"/>    
  </div>
</template>

<style src="../assets/css/style.css"></style>
