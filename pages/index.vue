<script setup>
import HeroSection from '~/components/HeroSection.vue';
import Testimonials from '~/components/Testimonials.vue';
//import Products from '~/components/Products.vue';
import { ref, onMounted } from 'vue';

const produtos = ref([]);

const fetchProdutos = async () => {
  try {
    const response = await fetch('http://localhost:3000/produtos'); // URL do JSON Server
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos da API');
    }
    produtos.value = await response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};
// Chamando a função ao montar o componente
onMounted(() => {
  fetchProdutos();
});

</script>

<template>
  <div>
    <HeroSection />
  </div>
  <div id="dishes">
    <!-- Verifica se há produtos -->
    <div v-if="produtos.length > 0">
      <!-- Itera sobre os produtos -->
      <div v-for="produto in produtos" :key="produto.id" class="dish">
        <div class="dish-heart">
          <i class="fa-solid fa-heart"></i>
        </div>

        <!-- Imagem do produto -->
        <img
          :src="produto.imagem"
          width="300"
          class="dish-image"
          :alt="produto.titulo"
        />
        <h3 class="dish-title">{{ produto.titulo }}</h3>

        <!-- Descrição do produto -->
        <span class="dish-description">
          {{ produto.descricao }}
        </span>

        <!-- Preço e botão -->
        <div class="dish-price">
          <h4>R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</h4>
          <button class="btn-default">
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>      
    </div>
     <!-- Mensagem caso não haja produtos -->
    <div v-else>
      <p>Carregando produtos...</p>
    </div>
  </div>     
  
  <div>
    <Testimonials />
    </div>


   
</template>




<style src="../assets/css/style.css"></style>

