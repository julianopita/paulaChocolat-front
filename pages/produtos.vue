<script setup>
import Products from '~/components/Products.vue'; // Importação correta
</script>

<template>
    Produtos dinâmicos
 <Products apiEndpoint="http://localhost:3000/produtos" />
</template>

<style src="../assets/css/style.css"></style>