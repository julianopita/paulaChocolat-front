<template>
  <header class="cabecalho">
    <nav id="navbar" role="navigation">
      <i class="fa-solid fa-cake-candles" id="nav-logo"> Paula Au Chocolat</i>
      <ul id="nav_list">
        <!-- Lista de navegação -->
        <li class="nav_item" :class="{ active: currentRoute === '/' }">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        </li>
        <li class="nav_item" :class="{ active: currentRoute === '/contato' }">
          <NuxtLink to="/contato" class="nav-link">Contato</NuxtLink>
        </li>
        <li class="nav_item" :class="{ active: currentRoute === '/produtos' }">
          <NuxtLink to="/produtos" class="nav-link">Produtos</NuxtLink>
        </li>
        <li class="nav_item" :class="{ active: currentRoute === '/sobrenos' }">
          <NuxtLink to="/sobrenos" class="nav-link">Sobre nós</NuxtLink>
        </li>
        <li class="nav_item" :class="{ active: currentRoute === '/orcamento' }">
          <NuxtLink to="/orcamento" class="nav-link">Orçamentos</NuxtLink>
        </li>
        <li class="nav_item">
  <!-- Condicional para exibir Login ou Sair -->
  <NuxtLink v-if="!user.papel" to="/login" class="nav-link">Login</NuxtLink>
  <a v-else @click.prevent="logout" class="nav-link">Sair</a>
</li>
        
    <div v-if="user.papel === 'Gerente'">
      <!-- Opções do Gerente -->
      <li class="nav_item" :class="{ active: currentRoute === '/gerenciar' }">
          <NuxtLink to="/gerenciar" class="nav-link">Gerenciar</NuxtLink>
        </li>
    </div>
    <div v-if="user.papel === 'Cliente'">
      <!-- Opções do Cliente -->
      <li class="nav_item" :class="{ active: currentRoute === '/meusOrcamentos' }">
          <NuxtLink to="/meusOrcamentos" class="nav-link">Meus Orçamentos</NuxtLink>
        </li>
    </div>
    <li class="nav_link">Bem vindo, {{ user.nome }}</li>
    



        <button class="mudar-tema" @click="mudarTema">
          <span class="material-symbols-outlined">contrast</span>
        </button>
      </ul>
      <div>
    
  </div>
  </nav>
  </header>      
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { user, setUser, clearUser } from '../composables/useUser';
import { useRouter } from 'vue-router';


onMounted(() => {
  loadUser(); // Carrega os dados do usuário do sessionStorage quando o componente é montado
});
console.log(loadUser.nome);

const router = useRouter(); // Acesso ao Vue Router

const logout = () => {
  clearUser(); // Limpa os dados do usuário
  router.push('/');
  //window.location.reload(); // Força o recarregamento da página para refletir a mudança
};
// Função de logout
/* const handleLogout = () => {
  // Remove as informações da sessão
  sessionStorage.removeItem('papel');
  sessionStorage.removeItem('primeiroNome');
  window.location.reload(); */

 /*  // Atualiza o estado reativo
  papel.value = '';
  nome.value = ''; */

  // Redireciona para a página inicial
/*   router.push('/');
}; */
</script>

<style src="~/assets/css/style.css"></style>