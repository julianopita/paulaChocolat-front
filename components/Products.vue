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
  <div id="dishes">
    <p v-if="loading">Carregando produtos...</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="produtos.length > 0">
      <div v-for="produto in produtos" :key="produto.id" class="dish">
        <img :src="produto.imagem" class="dish-image" :alt="produto.titulo" width="150px"/>
        <h3 class="dish-title">{{ produto.titulo }}</h3>
        <span class="dish-description">{{ produto.descricao }}</span>
        <div class="dish-price">
          <h4>R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</h4>
        </div>
      </div>
    </div>
    <p v-else-if="!loading">Nenhum produto encontrado.</p>
  </div>
</template>

<style src="../assets/css/style.css"></style>

<style scoped>
#dishes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Espaçamento de 20px entre os itens */
  justify-content: center; /* Centraliza os produtos na tela */
  padding: 20px; /* Espaçamento interno para o contêiner */
}

.dish {
  background-color: #f9f9f9; /* Cor de fundo para destacar o produto */
  border: 1px solid #ddd; /* Borda leve ao redor */
  border-radius: 8px; /* Cantos arredondados */
  padding: 15px; /* Espaçamento interno para o conteúdo */
  text-align: center; /* Centraliza texto e imagem dentro da caixa */
  max-width: 200px; /* Define uma largura máxima para as caixas */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra para realce */
}

.dish-image {
  width: 100%; /* Ocupa toda a largura disponível */
  height: auto; /* Mantém a proporção da imagem */
  max-height: 150px; /* Define um limite máximo de altura */
  object-fit: cover; /* Garante que a imagem não distorça */
  border-radius: 4px; /* Cantos arredondados para a imagem */
}

.dish-title {
  font-size: 1.2em;
  margin: 10px 0 5px;
  font-weight: bold;
  color: #333;
}

.dish-description {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
}

.dish-price h4 {
  font-size: 1.1em;
  color: #4caf50; /* Cor para destacar o preço */
  margin: 0;
}
</style>


