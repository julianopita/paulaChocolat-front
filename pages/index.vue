<script setup>
import HeroSection from '~/components/HeroSection.vue';
import Testimonials from '~/components/Testimonials.vue';
import Products from '~/components/Products.vue'; // Importação correta
</script>

<template>
  <div>
    <HeroSection />
    <Products apiEndpoint="http://localhost:3000/produtos" imageEndpoint="http://localhost:3000/static" :index="true" />
    <Testimonials />
  </div>
</template>

<style src="../assets/css/style.css"></style>