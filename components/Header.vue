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
        <button class="mudar-tema" @click="mudarTema">
          <span class="material-symbols-outlined">contrast</span>
        </button>
      </ul>

      <!-- Menu de hambúrguer para mobile -->
      <button id="mobile_btn" @click="toggleMobileMenu">
        <i class="fa-solid fa-bars"></i>
      </button>
    </nav>

    <div id="mobile_menu" :class="{ open: isMobileMenuOpen }">
      <ul id="mobile_nav_list">
        <li class="nav_item">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        </li>
        <li class="nav_item">
          <NuxtLink to="/contato" class="nav-link">Contato</NuxtLink>
        </li>
        <li class="nav_item">
          <NuxtLink to="/produtos" class="nav-link">Produtos</NuxtLink>
        </li>
        <li class="nav_item">
          <NuxtLink to="/sobrenos" class="nav-link">Sobre nós</NuxtLink>
        </li>
        <li class="nav_item">
          <NuxtLink to="/orcamento" class="nav-link">Orçamentos</NuxtLink>
        </li>
        <button class="mudar-tema" @click="mudarTema">
          <span class="material-symbols-outlined">contrast</span>
        </button>
      </ul>
    </div>
  </header>
</template>

<script setup>
// Lógica interna do componente, se necessário
function mudarTema() {
  // Este método será chamado no botão, já que os scripts estão disponíveis globalmente
  if (typeof window !== 'undefined' && typeof mudarTema === 'function') {
    mudarTema();
  }
}
</script>

<style src="../assets/css/style.css"></style>