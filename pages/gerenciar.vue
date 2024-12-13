<script setup>
import { ref, onMounted } from 'vue';

const produtos = ref([]);
const produtoEdicao = ref(null); // Produto sendo editado ou criado
const criandoNovoProduto = ref(false); // Flag para indicar se estamos criando um novo produto
const apiEndpoint = 'http://localhost:3000/produtos';
const imageEndpoint = 'http://localhost:3000/static';
const mensagemErro = ref('');
const mensagemSucesso = ref('');
const imagemArquivo = ref(null); // Armazena o arquivo de imagem para upload

// Carregar os produtos do banco
const carregarProdutos = async () => {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw new Error('Erro ao carregar os produtos');
    produtos.value = await response.json();
  } catch (error) {
    mensagemErro.value = error.message;
  }
};

// Criar novo produto
const criarProduto = async () => {
  try {
    let nomeImagem = '';
    if (imagemArquivo.value) {
      nomeImagem = await fazerUploadImagem();
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...produtoEdicao.value,
        imagem: nomeImagem,
      }),
    });

    if (!response.ok) throw new Error('Erro ao criar o produto');
    mensagemSucesso.value = 'Produto criado com sucesso!';
    produtoEdicao.value = null;
    imagemArquivo.value = null;
    criandoNovoProduto.value = false;
    await carregarProdutos();
  } catch (error) {
    mensagemErro.value = error.message;
  }
};

// Fazer upload de imagem
const fazerUploadImagem = async () => {
  const formData = new FormData();
  formData.append('imagem', imagemArquivo.value); // Adiciona a imagem ao FormData

  const response = await fetch(`${apiEndpoint}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Erro ao fazer upload da imagem');
  const { nomeImagem } = await response.json(); // O backend deve retornar o nome da imagem salva
  return nomeImagem;
};

// Deletar um produto
const deletarProduto = async (id) => {
  if (confirm('Você tem certeza que deseja excluir este produto?')) {
    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir o produto');
      mensagemSucesso.value = 'Produto excluído com sucesso!';
      await carregarProdutos();
    } catch (error) {
      mensagemErro.value = error.message;
    }
  }
};

// Abrir o formulário para criar um novo produto
const abrirFormularioCriacao = () => {
  criandoNovoProduto.value = true;
  produtoEdicao.value = {
    titulo: '',
    descricao: '',
    preco: 0,
    imagem: '',
  };
};

// Abrir o formulário para editar um produto
const abrirFormularioEdicao = (produto) => {
  criandoNovoProduto.value = false;
  produtoEdicao.value = { ...produto }; // Preenche o formulário com os dados do produto
};

// Atualizar produto existente
const atualizarProduto = async () => {
  try {
    let imagemPath = produtoEdicao.value.imagem;
    if (imagemArquivo.value) {
      imagemPath = await fazerUploadImagem();
    }

    const response = await fetch(`${apiEndpoint}/${produtoEdicao.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...produtoEdicao.value,
        imagem: imagemPath,
      }),
    });

    if (!response.ok) throw new Error('Erro ao atualizar o produto');
    mensagemSucesso.value = 'Produto atualizado com sucesso!';
    produtoEdicao.value = null;
    imagemArquivo.value = null;
    await carregarProdutos();
  } catch (error) {
    mensagemErro.value = error.message;
  }
};

// Função para manipular a mudança no input de arquivo
const handleFileChange = (e) => {
  if (e.target.files.length > 0) {
    imagemArquivo.value = e.target.files[0]; // Atribui o primeiro arquivo
  } else {
    imagemArquivo.value = null; // Se nenhum arquivo for selecionado, limpa a variável
  }
};

onMounted(carregarProdutos);
</script>

<template>
  <main>
    <h1 style="text-align: center;">Gerenciar Produtos</h1>

    <!-- Exibição de mensagens de erro e sucesso -->
    <div v-if="mensagemErro" class="erro">{{ mensagemErro }}</div>
    <div v-if="mensagemSucesso" class="sucesso">{{ mensagemSucesso }}</div>

    <!-- Lista de produtos -->
    
    <section>
      <div class="dishes">
        <ul class="card-container">
        <li v-for="produto in produtos" :key="produto.id" style="list-style: none;">
          <div class="card">
            <img :src="`${imageEndpoint}/${produto.imagem}`" class="card-image" :alt="produto.titulo" width="150px"/>
            <h3 class="card-title">{{ produto.titulo }}</h3>
            <span class="card-description">{{ produto.descricao }}</span>
            <div class="card-price">
              <h4>R$ {{ produto.preco.toFixed(2).replace('.', ',') }}</h4>
            </div>
            <div>
              <button style="background-color: #ff9900;" class="card-button" @click="abrirFormularioEdicao(produto)">Editar</button>
              <button style="background-color: #c50d0d;" class="card-button" @click="deletarProduto(produto.id)">Excluir</button>
            </div>
          </div>
        </li>
      </ul>
      </div>
      <!-- <h2>Produtos Atuais</h2> -->
      
    </section>

    <!-- Formulário de edição ou criação -->
    <section class="section-gerenciar-form" v-if="produtoEdicao">
      <h2>{{ criandoNovoProduto ? 'Criar Produto' : 'Editar Produto' }}</h2>
      <form class="form-criar-produto" @submit.prevent="criandoNovoProduto ? criarProduto() : atualizarProduto()">
        <label for="titulo">Título</label>
        <input v-model="produtoEdicao.titulo" type="text" id="titulo" required />

        <label for="descricao">Descrição</label>
        <textarea v-model="produtoEdicao.descricao" id="descricao" required></textarea>

        <label for="preco">Preço</label>
        <input v-model.number="produtoEdicao.preco" type="number" step="0.01" id="preco" required />

        <label for="imagem">Imagem</label>
        <input type="file" @change="handleFileChange" id="imagem" />
        <div class="form-button-container">
          <button class="form-button" type="submit">{{ criandoNovoProduto ? 'Criar Produto' : 'Salvar Alterações' }}</button>
          <button class="form-button" type="button" @click="produtoEdicao = null; criandoNovoProduto = false;">Cancelar</button>
        </div>
      </form>
    </section>

    <!-- Botão para criar novo produto -->
    <section style="display: flex; justify-content: center;">
      <button @click="abrirFormularioCriacao" class="form-button">Criar Novo Produto</button>
    </section>
  </main>
</template>

<style src="../assets/css/produtos_componente.css"></style>
<style src="../assets/css/formularios.css"></style>

<style>
/* .section-gerenciar-form{
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-criar-produto{
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.form-button-container{
  display: flex;
  justify-content: center
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
}

input[type="text"],
input[type="number"],
textarea{
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    background-color: #f9f9f9;
}

textarea {
    resize: vertical;
}

input[type="file"] {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

input[type="file"]::file-selector-button{
  font-weight: bold;
  color: dodgerblue;
  padding: 0.5em;
  margin-right: 10px;
  border: thin solid grey;
  border-radius: 3px;
}

input[type="file"]::file-selector-button:hover{
  cursor: pointer;
}

.form-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #007bff;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.form-button:hover {
    background-color: #0056b3;
} */

.erro {
  color: red;
}

.sucesso {
  color: green;
}
</style>
