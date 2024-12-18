<script setup>
import Products from '~/components/Products.vue'; // Importação correta
</script>

<template>
 <Products apiEndpoint="http://localhost:3000/produtos" imageEndpoint="http://localhost:3000/static"/>
</template>

<style src="../assets/css/style.css"></style>