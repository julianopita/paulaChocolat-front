<template>
  <main id="content">
    <div id="form-container">
      <form id="formulario" @submit.prevent="validaForm">
        <h2 id="titulo">Formulário para Contato</h2>
        <div id="nomes">
          <div class="nome">
            <label for="firstName">Primeiro Nome</label>
            <input
              v-model="form.firstName"
              class="input-formulario"
              type="text"
              name="firstName"
              required
            />
          </div>
          <div class="nome">
            <label for="lastName">Último Nome</label>
            <input
              v-model="form.lastName"
              class="input-formulario"
              type="text"
              name="lastName"
            />
          </div>
        </div>
        <div>
          <label for="email">E-mail</label>
          <input
            v-model="form.email"
            class="input-formulario"
            type="email"
            name="email"
            required
          />
        </div>
        <div id="botoes">
          <button id="btn-enviar" type="submit">Enviar</button>
          <button id="btn-limpar" type="reset" @click="resetForm">Limpar</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

// Estado do formulário
const form = ref({
  firstName: '',
  lastName: '',
  email: ''
});

// Função de validação do formulário
const validaForm = () => {
  // Validação básica antes de enviar (exemplo)
  if (!form.value.firstName || !form.value.email) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Aqui você pode integrar com uma API ou backend para enviar o formulário
  console.log('Formulário enviado:', form.value);

  // Limpa o formulário após o envio
  resetForm();
};

// Função para limpar o formulário
const resetForm = () => {
  form.value.firstName = '';
  form.value.lastName = '';
  form.value.email = '';
};
</script>

<style src="../assets/css/style.css"></style>