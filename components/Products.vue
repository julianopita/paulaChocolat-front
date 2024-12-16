<script setup>
import { ref, onMounted } from 'vue';


/* // Código para testar com dados mockados
const produtosMock = [
  {
    id: 1,
    titulo: "Produto de Teste 1",
    descricao: "Descrição do produto 1",
    preco: 99.99,
    imagem: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    titulo: "Produto de Teste 2",
    descricao: "Descrição do produto 2",
    preco: 149.99,
    imagem: "https://via.placeholder.com/300"
  },
  {
    id: 3,
    titulo: "Produto de Teste 3",
    descricao: "Descrição do produto 3",
    preco: 199.99,
    imagem: "https://via.placeholder.com/300"
  }
];

const produtos = ref([]);
const loading = ref(true);
const error = ref(null);

// Substituindo a lógica de fetch pelos dados mockados
const fetchProdutos = async () => {
  try {
    // Simula um delay para o teste
    await new Promise(resolve => setTimeout(resolve, 500));
    produtos.value = produtosMock; // Atribui os dados mockados
  } catch (err) {
    error.value = err.message;
    console.error(err);
  } finally {
    loading.value = false;
  }
}; */


// Defina as props corretamente
const props = defineProps({
  apiEndpoint: {
    type: String,
    required: true,
  },
  imageEndpoint: {
    type: String,
    required: true,
  },
  index: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const produtos = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProdutos = async () => {
  try {
    // Agora estamos usando props.apiEndpoint para garantir que estamos acessando corretamente a prop
    const response = await fetch(props.apiEndpoint);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    produtos.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error('Erro no fetch:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProdutos);
</script>

<template>
  <div class="dishes">
    <p v-if="loading">Carregando produtos...</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="produtos.length > 0">
      <div v-if="props.index" class="card-container">
        <div v-for="produto in produtos.slice(0, 3)" :key="produto.id" class="card">
          <img :src="`${props.imageEndpoint}/${produto.imagem}`" class="card-image" :alt="produto.titulo" width="150px"/>
          <h3 class="card-title">{{ produto.titulo }}</h3>
          <span class="card-description">{{ produto.descricao }}</span>
          <div class="card-price">
            <h4>R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</h4>
          </div>
        </div>
      </div>
      <div v-else class="card-container">
        <div v-for="produto in produtos" :key="produto.id" class="card">
          <img :src="`${props.imageEndpoint}/${produto.imagem}`" class="card-image" :alt="produto.titulo" width="150px"/>
          <h3 class="card-title">{{ produto.titulo }}</h3>
          <span class="card-description">{{ produto.descricao }}</span>
          <div class="card-price">
            <h4>R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</h4>
          </div>
        </div>
      </div>
    </div>
    <p v-else-if="!loading">Nenhum produto encontrado.</p>
  </div>
</template>

<style src="../assets/css/style.css"></style>
<!--<style src="../assets/css/produtos_componente.css"></style>-->

<!-- <style scoped>

</style> -->


