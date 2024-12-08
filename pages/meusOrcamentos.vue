<template>
  <div>
    <h1>Meus Orçamentos</h1>
    
    <!-- Botão para novo pedido -->
    <button @click="novoPedido">Novo Pedido</button>

    <!-- Lista de orçamentos -->
    <div v-if="orcamentos.length > 0">
      <div v-for="orcamento in orcamentos" :key="orcamento.id">
  <p><strong>Massa:</strong> {{ orcamento.massaNome }}</p>
  <p><strong>Recheio 1:</strong> {{ orcamento.recheio1Nome }}</p>
  <p><strong>Recheio 2:</strong> {{ orcamento.recheio2Nome }}</p>
  <p><strong>Cobertura:</strong> {{ orcamento.coberturaNome }}</p>
  <p><strong>Frase:</strong> {{ orcamento.frase }}</p>
  <p><strong>Data:</strong> {{ orcamento.data }}</p>
  <button @click="deletarOrcamento(orcamento.id)">Deletar</button>
  <button @click="$router.push(`/alterarOrcamento/${orcamento.id}`)">Editar</button>

</div>
    </div>
    
    <!-- Se não houver orçamentos -->
    <p v-else>Nenhum orçamento encontrado.</p>
  </div>
</template>

<script>
const apiEndpoint = 'http://localhost:3000';

export default {
  data() {
    return {
      orcamentos: [],
    };
  },
  created() {
    // Carrega os orçamentos do usuário
    this.fetchOrcamentos();
  },
  methods: {
    // Carregar os orçamentos do cliente
  async fetchOrcamentos() {
  const email = sessionStorage.getItem('email');
  if (email) {
    try {
      const resposta = await fetch(`${apiEndpoint}/orcamentos/pedidos?usuario=${email}`);
      if (resposta.ok) {
        const pedidos = await resposta.json();

        // Certifique-se de carregar os itens antes de processar os pedidos
        await this.fetchItens();

        // Associa os nomes dos itens aos IDs nos pedidos
        this.orcamentos = pedidos.map(pedido => ({
          ...pedido,
          massaNome: this.itens.find(item => item.id === pedido.massa)?.nome || 'Desconhecido',
          recheio1Nome: this.itens.find(item => item.id === pedido.recheio1)?.nome || 'Desconhecido',
          recheio2Nome: this.itens.find(item => item.id === pedido.recheio2)?.nome || 'Desconhecido',
          coberturaNome: this.itens.find(item => item.id === pedido.cobertura)?.nome || 'Desconhecido',
        }));
      } else {
        console.error('Erro ao carregar orçamentos');
      }
    } catch (erro) {
      console.error('Erro ao carregar orçamentos:', erro);
    }
  } else {
    alert('Você precisa estar logado para ver seus orçamentos');
  }
},


    async fetchItens() {
  try {
    const resposta = await fetch(`${apiEndpoint}/orcamentos/items`);
    if (resposta.ok) {
      this.itens = await resposta.json();
    } else {
      console.error('Erro ao carregar itens');
    }
  } catch (erro) {
    console.error('Erro ao carregar itens:', erro);
  }
},


    // Redireciona para a página de novo pedido
    novoPedido() {
      this.$router.push('/orcamento');
    },

    // Alterar um orçamento (poderia ser uma nova página ou pop-up para editar)
    alterarOrcamento(id) {
      this.$router.push(`/alterarOrcamento/${id}`);
    },

    // Deletar um orçamento
    async deletarOrcamento(id) {
      if (confirm('Tem certeza que deseja excluir este orçamento?')) {
        try {
          const resposta = await fetch(`${apiEndpoint}/orcamentos/pedidos/${id}`, {
            method: 'DELETE',
          });

          if (resposta.ok) {
            alert('Orçamento excluído com sucesso!');
            this.fetchOrcamentos(); // Recarrega os orçamentos após exclusão
          } else {
            alert('Erro ao excluir o orçamento');
          }
        } catch (erro) {
          console.error('Erro ao excluir o orçamento:', erro);
          alert('Erro ao excluir o orçamento');
        }
      }
    },
  },
};
</script>

<style scoped>
.orcamento-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  background-color: #f9f9f9;
}

button {
  margin-top: 10px;
}
</style>
