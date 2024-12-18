<template>
    <div>
      <h1>Editar Orçamento</h1>
  
      <form @submit.prevent="submitEdicao">
        <!-- Massa -->
        <h3 class="card-section-title" for="massa">Massa:</h3>
        <div class="opcao-cards">
          <div
            v-for="item in massas"
            :key="item.id"
            :class="{ 'selecionado': pedido.massa === item.id }"
            class="opcao-card"
            @click="pedido.massa = item.id"
          >
            <img :src="`http://localhost:3000/static/opcoes_bolo/${item.imagem}`" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Recheio 1 -->
        <h3 class="card-section-title" for="recheio1">Recheio 1:</h3>
        <div class="opcao-cards">
          <div
            v-for="item in recheios1"
            :key="item.id"
            :class="{ 'selecionado': pedido.recheio1 === item.id }"
            class="opcao-card"
            @click="pedido.recheio1 = item.id"
          >
            <img :src="`http://localhost:3000/static/opcoes_bolo/${item.imagem}`" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Recheio 2 -->
        <h3 class="card-section-title" for="recheio2">Recheio 2:</h3>
        <div class="opcao-cards">
          <div
            v-for="item in recheios2"
            :key="item.id"
            :class="{ 'selecionado': pedido.recheio2 === item.id }"
            class="opcao-card"
            @click="pedido.recheio2 = item.id"
          >
            <img :src="`http://localhost:3000/static/opcoes_bolo/${item.imagem}`" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Cobertura -->
        <h3 class="card-section-title" for="cobertura">Cobertura:</h3>
        <div class="opcao-cards">
          <div
            v-for="item in coberturas"
            :key="item.id"
            :class="{ 'selecionado': pedido.cobertura === item.id }"
            class="opcao-card"
            @click="pedido.cobertura = item.id"
          >
            <img :src="`http://localhost:3000/static/opcoes_bolo/${item.imagem}`" :alt="item.nome" />
            <h3>{{ item.nome }}</h3>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Frase -->
        <section class="section-gerenciar-form" style="margin-top: 20px;">
          <div class="form-submit">
        <label for="frase">Frase (Máximo 30 caracteres):</label>
        <input
          v-model="pedido.frase"
          type="text"
          maxlength="30"
          placeholder="Escreva uma frase"
        />
      </div>   
  
        <button class="form-button" type="submit">Salvar Alterações</button>
      </section>
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
        const respostaPedido = await fetch(`${apiEndpoint}/orcamento/pedido/id/${id}`);
        this.pedido = await respostaPedido.json();
        console.log("===========", this.pedido);
  
        // Carregar as opções
        const respostaOpcoes = await fetch(`${apiEndpoint}/orcamento/item`);
        const items = await respostaOpcoes.json();
        this.coberturas = items.filter(item => item.tipo === 0); // Tipo 0 é Cobertura
        this.recheios1 = items.filter(item => item.tipo === 1); // Tipo 1 é Recheio1
        this.recheios2 = items.filter(item => item.tipo === 2); // Tipo 2 é Recheio2
        this.massas = items.filter(item => item.tipo === 3); // Tipo 3 é Massa
      } catch (erro) {
        console.error('Erro ao carregar os dados:', erro);
      }
    },
    methods: {
      async submitEdicao() {
        try {
          const id = this.$route.params.id;
  
          const resposta = await fetch(`${apiEndpoint}/orcamento/pedido/${id}`, {
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

  <style src="../../assets/css/orcamentos_componente.css"></style>
  <style src="../../assets/css/formularios.css"></style>
  
  <!-- <style>
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
  </style> -->
  