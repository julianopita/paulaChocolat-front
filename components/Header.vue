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

<script>
export default {  
  mounted() {
    if (process.client) {
      let temaArmazenado = localStorage.getItem('tema');
      
      if (temaArmazenado) {
        if (temaArmazenado === 'dark') {
          this.mudarParaModoDark();
        } else {
          this.mudarParaModoLight();
        }
      } else {
        this.mudarParaModoLight();
      }
    }
  },
  methods: {
    mudarTema() {
      let computedStyle = window.getComputedStyle(document.body);
      let backgroundColor = computedStyle.backgroundColor;

      if (backgroundColor === 'rgb(255, 249, 234)') {
        this.mudarParaModoDark();
        localStorage.setItem('tema', 'dark');
      } else {
        this.mudarParaModoLight();
        localStorage.setItem('tema', 'light');
      }
    },
    mudarParaModoDark() {
      this.$nextTick(() => { // Espera até o DOM ser totalmente atualizado
        const root = document.documentElement;
        if (root) {
          root.style.setProperty('--cor-principal-fundo', '#1A1A1A');
          root.style.setProperty('--cor-neutra-preta', '#F5F5F5');
          root.style.setProperty('--cor-neutra-branca', '#333333');
          // Adicione as outras propriedades de cor aqui...

          // Verifica a existência de 'wave' ou 'waveind'
          const wave = document.getElementById('wave');
          const waveind = document.getElementById('waveind');
          if (wave) {
            wave.src = "../images/wave_dark.svg";
          } else if (waveind) {
            waveind.src = "images/wave_dark.svg";
          }

          // Verifica a existência de 'content' ou 'contentind'
          const content = document.getElementById('content');
          const contentind = document.getElementById('contentind');
          if (content) {
            content.style.backgroundImage = "url('../images/wave_invertida_dark.svg')";
          } else if (contentind) {
            contentind.style.backgroundImage = "url('images/wave_invertida_dark.svg')";
          }
        }
      });
    },
    mudarParaModoLight() {
      this.$nextTick(() => { // Espera até o DOM ser totalmente atualizado
        const root = document.documentElement;
        if (root) {
          root.style.setProperty('--cor-principal-fundo', '#fff9ea');
          root.style.setProperty('--cor-neutra-preta', '#000000');
          root.style.setProperty('--cor-neutra-branca', '#ffffff');
          // Adicione as outras propriedades de cor aqui...

          // Verifica a existência de 'wave' ou 'waveind'
          const wave = document.getElementById('wave');
          const waveind = document.getElementById('waveind');
          if (wave) {
            wave.src = "../images/wave.svg";
          } else if (waveind) {
            waveind.src = "images/wave.svg";
          }

          // Verifica a existência de 'content' ou 'contentind'
          const content = document.getElementById('content');
          const contentind = document.getElementById('contentind');
          if (content) {
            content.style.backgroundImage = "url('../images/wave_invertida_light.svg')";
          } else if (contentind) {
            contentind.style.backgroundImage = "url('images/wave_invertida_light.svg')";
          }
        }
      });
    }
  }
};
</script>

<style src="~/assets/css/style.css"></style>