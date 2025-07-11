<!-- src/components/Sidebar.vue -->
<template>
  <aside class="w-64 bg-white shadow h-screen p-6 hidden md:block">
    <h2 class="font-bold text-xl mb-6">Menu</h2>
    <ul class="space-y-2">
      <li><router-link to="/dashboard" class="text-blue-600 hover:underline">Dashboard</router-link></li>
      <li><router-link to="/schedule" class="text-blue-600 hover:underline">Lịch bác sĩ</router-link></li>
    </ul>
  </aside>
</template>
