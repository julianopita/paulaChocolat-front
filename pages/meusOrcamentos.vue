<template>
  <div>
    <div style="display: flex; justify-content: center; ">
      <h1 style="margin-right: 25px; text-align: center;">Meus Orçamentos</h1>
      <button class="form-button" @click="novoPedido">Novo Pedido</button>
    </div>
    <div v-if="orcamentos.length > 0">
      <div v-for="orcamento in orcamentos" :key="orcamento.id">
        <div class="tabela-container">
          <table class="tabela">
            <thead>
              <tr>
                <th>Massa</th>
                <th>Primeiro Recheio</th>
                <th>Segundo Recheio</th>
                <th>Cobertura</th>
                <th>Frase</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ orcamento.massaNome }}</td>
                <td>{{ orcamento.recheio1Nome }}</td>
                <td>{{ orcamento.recheio2Nome }}</td>
                <td>{{ orcamento.coberturaNome }}</td>
                <td>{{ orcamento.frase }}</td>
                <td>{{ orcamento.data }}</td>
                <td><button style="background-color: #ff9900;" class="card-button" @click="$router.push(`/alterarOrcamento/${orcamento.id}`)">Editar</button></td>
                <td><button style="background-color: #c50d0d;" class="card-button" @click="deletarOrcamento(orcamento.id)">Deletar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p v-else>Nenhum orçamento encontrado.</p>
  </div>
  <!-- Botão para novo pedido -->


  <!-- Lista de orçamentos -->
  <!-- <div v-if="orcamentos.length > 0">
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
    </div> -->

  <!-- Se não houver orçamentos -->
  <!-- <p v-else>Nenhum orçamento encontrado.</p> -->

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
          const resposta = await fetch(`${apiEndpoint}/orcamento/pedido/${email}`);
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
        const resposta = await fetch(`${apiEndpoint}/orcamento/item`);
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
          const resposta = await fetch(`${apiEndpoint}/orcamento/pedido/${id}`, {
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

<style src="../assets/css/tabelas.css"></style>
<style src="../assets/css/formularios.css"></style>
<style src="../assets/css/produtos_componente.css"></style>

<!-- <style scoped>
.orcamento-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  background-color: #f9f9f9;
}

button {
  margin-top: 10px;
}
</style> -->
