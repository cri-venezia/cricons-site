<script setup lang="ts">
import { ref } from 'vue'
import IconGrid from '../components/IconGrid.vue'

const searchQuery = ref('')
</script>

<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center space-y-8 pt-10 pb-6 relative z-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4 animate-fade-in-up">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        New v1.0 Released
      </div>

      <h1 class="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in-up delay-100">
        <span class="text-white">Crafted for</span>
        <br />
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Modern Interfaces
        </span>
      </h1>
      
      <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
        A premium collection of pixel-perfect SVG icons for Vue.js. 
        <br class="hidden md:block" />
        Lightweight, customizable, and ready for your next project.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur"></div>
          <div class="relative flex items-center bg-slate-900 rounded-xl p-1">
            <svg class="w-5 h-5 text-slate-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search 200+ icons..." 
              class="bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 w-64 h-10"
            />
            <div class="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded mx-2 border border-slate-700">⌘K</div>
          </div>
        </div>
        
        <router-link to="/how-to">
          <button class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all border border-slate-700 flex items-center gap-2">
            <span>Get Started</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </router-link>
      </div>
    </section>

    <!-- Icon Grid -->
    <div id="grid-start">
        <IconGrid :initial-search="searchQuery" />
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
