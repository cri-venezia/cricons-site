<script setup lang="ts">
import { ref } from 'vue'
import { CodeXml } from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden">
    <!-- Background Decor (Glows) -->
    <div class="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
    <div class="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow delay-75"></div>

    <!-- Navigation -->
    <nav class="sticky top-4 z-50 mx-6 lg:mx-auto max-w-7xl glass rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300">
      <div class="flex items-center gap-4">
        <!-- Logo Placeholder -->
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Cricons
          </span>
      </div>

      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400 mx-4">
        <router-link to="/" class="hover:text-white transition-colors" active-class="text-white">Icone</router-link>
        <router-link to="/how-to" class="hover:text-white transition-colors" active-class="text-white">Guida</router-link>
        <a href="https://github.com/cri-venezia/cricons" target="_blank" class="hover:text-white transition-colors"><CodeXml /></a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 pt-8 pb-16 z-0">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm py-8 mt-auto">
      <div class="container mx-auto px-4 text-center text-slate-500 text-sm">
        <p>Built with ❤️ by Luca & Ada. &copy; {{ new Date().getFullYear() }} Cricons.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
</style>
