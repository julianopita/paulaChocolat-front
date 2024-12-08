// src/composables/useUser.js

import { reactive } from 'vue';

export const user = reactive({
  papel: '',
  nome: '',
  email: ''
});

export function setUser(papel, nome, email) {
  user.papel = papel;
  user.nome = nome;
  user.email = email;
  if (process.client) {
    sessionStorage.setItem('papel', papel);
    sessionStorage.setItem('primeiroNome', nome);
    sessionStorage.setItem('email', email);
  }
}

export function clearUser() {
  user.papel = '';
  user.nome = '';
  user.email = '';
  if (process.client) {
    sessionStorage.removeItem('papel');
    sessionStorage.removeItem('primeiroNome');
    sessionStorage.removeItem('email');
  }
}

// Carregar o estado do usuário (do sessionStorage)
export function loadUser() {
  if (process.client) {
    const papel = sessionStorage.getItem('papel');
    const nome = sessionStorage.getItem('primeiroNome');
    const email = sessionStorage.getItem('email');
    if (papel && nome && email) {
      user.papel = papel;
      user.nome = nome;
      user.email = email;
    }
  }
}
