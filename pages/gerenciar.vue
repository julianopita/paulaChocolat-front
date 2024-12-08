<script setup>
import { ref, onMounted } from 'vue';

const produtos = ref([]);
const produtoEdicao = ref(null); // Produto sendo editado ou criado
const criandoNovoProduto = ref(false); // Flag para indicar se estamos criando um novo produto
const apiEndpoint = 'http://localhost:3000/produtos';
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
    let imagemPath = '';
    if (imagemArquivo.value) {
      imagemPath = await fazerUploadImagem();
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...produtoEdicao.value,
        imagem: imagemPath,
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
  const { path } = await response.json(); // O backend deve retornar o caminho da imagem salva
  console.log(path);
  return path;
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
    <h1>Gerenciar Produtos</h1>

    <!-- Exibição de mensagens de erro e sucesso -->
    <div v-if="mensagemErro" class="erro">{{ mensagemErro }}</div>
    <div v-if="mensagemSucesso" class="sucesso">{{ mensagemSucesso }}</div>

    <!-- Lista de produtos -->
    <section>
      <h2>Produtos Atuais</h2>
      <ul>
        <li v-for="produto in produtos" :key="produto.id">
          <div>
            <h3>{{ produto.titulo }}</h3>
            <p>{{ produto.descricao }}</p>
            <p>Preço: R$ {{ produto.preco.toFixed(2) }}</p>
            <img :src="produto.imagem" alt="Imagem do produto" width="100" />
            <button @click="deletarProduto(produto.id)">Excluir</button>
            <button @click="abrirFormularioEdicao(produto)">Editar</button>
          </div>
        </li>
      </ul>
    </section>

    <!-- Formulário de edição ou criação -->
    <section v-if="produtoEdicao">
      <h2>{{ criandoNovoProduto ? 'Criar Produto' : 'Editar Produto' }}</h2>
      <form @submit.prevent="criandoNovoProduto ? criarProduto() : atualizarProduto()">
        <label for="titulo">Título</label>
        <input v-model="produtoEdicao.titulo" type="text" id="titulo" required />

        <label for="descricao">Descrição</label>
        <textarea v-model="produtoEdicao.descricao" id="descricao" required></textarea>

        <label for="preco">Preço</label>
        <input v-model.number="produtoEdicao.preco" type="number" id="preco" required />

        <label for="imagem">Imagem</label>
        <input type="file" @change="handleFileChange" id="imagem" />

        <button type="submit">{{ criandoNovoProduto ? 'Criar Produto' : 'Salvar Alterações' }}</button>
        <button type="button" @click="produtoEdicao = null; criandoNovoProduto = false;">Cancelar</button>
      </form>
    </section>

    <!-- Botão para criar novo produto -->
    <section>
      <button @click="abrirFormularioCriacao">Criar Novo Produto</button>
    </section>
  </main>
</template>

<style>
.erro {
  color: red;
}

.sucesso {
  color: green;
}

button {
  margin: 5px;
}
</style>
