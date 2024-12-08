<template>
    <div>
      <h1>Monte seu Orçamento</h1>
      
      <form @submit.prevent="submitPedido">
        <!-- Massa -->
        <h3>Massa</h3>
        <div class="opcao-cards">
          <div 
            v-for="item in massas" 
            :key="item.id" 
            class="opcao-card" 
            :class="{'selecionado': pedido.massa === item.id}"
            @click="pedido.massa = item.id">
            <img :src="item.imagem" alt="Imagem da massa" width="100px" />
            <p>{{ item.nome }}</p>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Recheio 1 -->
        <h3>Recheio 1</h3>
        <div class="opcao-cards">
          <div 
            v-for="item in recheios" 
            :key="item.id" 
            class="opcao-card" 
            :class="{'selecionado': pedido.recheio1 === item.id}"
            @click="pedido.recheio1 = item.id">
            <img :src="item.imagem" alt="Imagem do recheio" width="100px" />
            <p>{{ item.nome }}</p>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Recheio 2 -->
        <h3>Recheio 2</h3>
        <div class="opcao-cards">
          <div 
            v-for="item in recheios" 
            :key="item.id" 
            class="opcao-card" 
            :class="{'selecionado': pedido.recheio2 === item.id}"
            @click="pedido.recheio2 = item.id">
            <img :src="item.imagem" alt="Imagem do recheio" width="100px" />
            <p>{{ item.nome }}</p>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Cobertura -->
        <h3>Cobertura</h3>
        <div class="opcao-cards">
          <div 
            v-for="item in coberturas" 
            :key="item.id" 
            class="opcao-card" 
            :class="{'selecionado': pedido.cobertura === item.id}"
            @click="pedido.cobertura = item.id">
            <img :src="item.imagem" alt="Imagem da cobertura" width="100px" />
            <p>{{ item.nome }}</p>
            <p>{{ item.descricao }}</p>
          </div>
        </div>
  
        <!-- Frase -->
        <label for="frase">Frase (Máximo 30 caracteres):</label>
        <input v-model="pedido.frase" type="text" maxlength="30" placeholder="Escreva uma frase" />
  
        <button type="submit">Enviar Pedido</button>
      </form>
    </div>
  </template>
  
  <script>
  const apiEndpoint = 'http://localhost:3000';

  export default {
    data() {
      return {
        massas: [], // Armazenará as opções de massa
        recheios: [], // Armazenará as opções de recheio
        coberturas: [], // Armazenará as opções de cobertura
        pedido: {
          massa: null,
          recheio1: null,
          recheio2: null,
          cobertura: null,
          frase: '',
          data: '',
          usuario: '',
        },
      };
    },
    created() {
      // Carrega as opções de massa, recheio e cobertura
      this.fetchOpcoes();
  
      // A data do orçamento é a data atual
      this.pedido.data = new Date().toLocaleDateString('pt-BR');
  
      // Pega o email do usuário do sessionStorage
      this.pedido.usuario = sessionStorage.getItem('email');      
    },
    methods: {
      async fetchOpcoes() {
        try {
          const resposta = await fetch(`${apiEndpoint}/orcamento/item`);
          const items = await resposta.json();
          console.log('Itens recuperados:', items);
  
          // Organiza os itens nas categorias apropriadas
          this.massas = items.filter(item => item.tipo === 2); // Tipo 2 é Massa
          this.recheios = items.filter(item => item.tipo === 3); // Tipo 3 é Recheio
          this.coberturas = items.filter(item => item.tipo === 1); // Tipo 1 é Cobertura
        } catch (erro) {
          console.error('Erro ao carregar opções:', erro);
        }
      },
      async submitPedido() {
        try {
          const resposta = await fetch(`${apiEndpoint}/orcamento/pedido`, {            
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.pedido),            
          });
  
          if (resposta.ok) {
            const pedidoCriado = await resposta.json();
            console.log('Pedido criado com sucesso:', pedidoCriado);
            // Alerta de sucesso
            alert('Seu pedido foi enviado com sucesso!');
            // Redirecionamento para a página "meusOrcamentos"
            this.$router.push('/meusOrcamentos');
          } else {
            console.error('Erro ao criar pedido');
            alert('Ocorreu um erro ao enviar seu pedido. Tente novamente.');
          }
        } catch (erro) {
          console.error('Erro ao enviar pedido:', erro);
          alert('Ocorreu um erro ao enviar seu pedido. Tente novamente.');
        }
      },
    },
  };
  </script>
  <style scoped>
  .opcao-cards {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .opcao-card {
    width: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    transition: transform 0.2s ease;
  }
  
  .opcao-card img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .opcao-card p {
    margin: 5px 0;
  }
  
  .opcao-card:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .selecionado {
    border: 2px solid #4CAF50;
    background-color: #f0f8f0;
  }
  </style>