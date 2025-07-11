<!-- src/views/DashboardView.vue -->
<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 p-6 bg-gray-100">
      <Navbar />
      <h1 class="text-2xl font-bold mb-4">Bảng thông báo</h1>
      <div class="grid gap-4">
        <div v-for="item in announcements" :key="item.id" class="bg-white p-4 rounded shadow">
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { announcements } from '../data/mockData'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
</script>
