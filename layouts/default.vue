<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
</script>

<style>
/* Estilos globais para o layout */
main {
  padding: 20px;
  min-height: 70vh; /* Para manter o conteúdo centralizado */
}
</style>
