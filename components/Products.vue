<script setup>
import { ref } from 'vue';

// Defina as props corretamente
defineProps({
  apiEndpoint: {
    type: String,
    required: true,
  },
});


const produtos = ref([]);

const fetchProdutos = async () => {
  try {
    const response = await fetch(apiEndpoint);
    produtos.value = await response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

//const fetchProdutos = async () => {
 // try {
    //const { data } = await useFetch('/produtos.json'); //mock
    //const { data } = await useFetch('http://localhost:3000/produtos'); // useFetch usa a prop apiEndpoint
    //produtos.value = data.value || [];
 // } catch (error) {
  //  console.error("Erro ao buscar produtos:", error);
 // }
//};

fetchProdutos();

</script>


<template>
  <div id="dishes">
    <div v-for="produto in produtos" :key="produto.id" class="dish">
      <img :src="produto.imagem" class="dish-image" :alt="produto.titulo" />
      <h3 class="dish-title">{{ produto.titulo }}</h3>
      <span class="dish-description">{{ produto.descricao }}</span>
      <div class="dish-price">
        <h4>R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos para o componente */
</style>
