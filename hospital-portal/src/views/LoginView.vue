<!-- src/views/LoginView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Tài khoản" class="input" />
        <input v-model="password" type="password" placeholder="Mật khẩu" class="input mt-4" />
        <button type="submit" class="btn mt-6 w-full">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

function handleLogin() {
  if (username.value === 'admin' && password.value === '123456') {
    router.push('/dashboard')
  } else {
    alert('Sai tài khoản hoặc mật khẩu')
  }
}
</script>

<style scoped>
.input {
  @apply w-full p-2 border border-gray-300 rounded;
}
.btn {
  @apply bg-blue-600 text-white py-2 rounded hover:bg-blue-700;
}
</style>
