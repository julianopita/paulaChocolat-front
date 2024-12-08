<template>
    <div>
      <h1>Editar Orçamento</h1>
  
      <form @submit.prevent="submitEdicao">
        <!-- Massa -->
        <label for="massa">Massa:</label>
        <div class="opcoes">
          <div
            v-for="item in massas"
            :key="item.id"
            :class="{ selecionado: pedido.massa === item.id }"
            class="card"
            @click="pedido.massa = item.id"
          >
            <img :src="item.imagem" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Recheio 1 -->
        <label for="recheio1">Recheio 1:</label>
        <div class="opcoes">
          <div
            v-for="item in recheios"
            :key="item.id"
            :class="{ selecionado: pedido.recheio1 === item.id }"
            class="card"
            @click="pedido.recheio1 = item.id"
          >
            <img :src="item.imagem" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Recheio 2 -->
        <label for="recheio2">Recheio 2:</label>
        <div class="opcoes">
          <div
            v-for="item in recheios"
            :key="item.id"
            :class="{ selecionado: pedido.recheio2 === item.id }"
            class="card"
            @click="pedido.recheio2 = item.id"
          >
            <img :src="item.imagem" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Cobertura -->
        <label for="cobertura">Cobertura:</label>
        <div class="opcoes">
          <div
            v-for="item in coberturas"
            :key="item.id"
            :class="{ selecionado: pedido.cobertura === item.id }"
            class="card"
            @click="pedido.cobertura = item.id"
          >
            <img :src="item.imagem" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Frase -->
        <label for="frase">Frase (Máximo 30 caracteres):</label>
        <input
          v-model="pedido.frase"
          type="text"
          maxlength="30"
          placeholder="Escreva uma frase"
        />
  
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </template>
  
  <script>
  const apiEndpoint = 'http://localhost:3000';
  
  export default {
    data() {
      return {
        pedido: {
          massa: null,
          recheio1: null,
          recheio2: null,
          cobertura: null,
          frase: '',
        },
        massas: [],
        recheios: [],
        coberturas: [],
      };
    },
    async created() {
      try {
        const id = this.$route.params.id;
  
        // Carregar os dados do pedido atual
        const respostaPedido = await fetch(`${apiEndpoint}/orcamentos/pedidos/${id}`);
        this.pedido = await respostaPedido.json();
  
        // Carregar as opções
        const respostaOpcoes = await fetch(`${apiEndpoint}/orcamentos/items`);
        const items = await respostaOpcoes.json();
        this.massas = items.filter((item) => item.tipo === 2); // Tipo 2 é Massa
        this.recheios = items.filter((item) => item.tipo === 3); // Tipo 3 é Recheio
        this.coberturas = items.filter((item) => item.tipo === 1); // Tipo 1 é Cobertura
      } catch (erro) {
        console.error('Erro ao carregar os dados:', erro);
      }
    },
    methods: {
      async submitEdicao() {
        try {
          const id = this.$route.params.id;
  
          const resposta = await fetch(`${apiEndpoint}/orcamentos/pedidos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.pedido),
          });
  
          if (resposta.ok) {
            alert('Orçamento atualizado com sucesso!');
            this.$router.push('/meusOrcamentos'); // Redireciona para a lista de orçamentos
          } else {
            console.error('Erro ao atualizar orçamento');
          }
        } catch (erro) {
          console.error('Erro ao enviar os dados:', erro);
        }
      },
    },
  };
  </script>
  
  <style>
  /* Estilos para os cards */
  .opcoes {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .card {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card img {
    max-width: 100px;
    border-radius: 8px;
  }
  
  .card.selecionado {
    border-color: #007bff;
    background-color: #e6f7ff;
  }
  </style>
  