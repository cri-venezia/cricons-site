<script setup lang="ts">
import { ref } from 'vue'
import { CodeXml, Grid, BookOpen, Home as HomeIcon, Menu, X } from 'lucide-vue-next';

const isMenuOpen = ref(false)
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
          <router-link to="/" class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Cricons
          </router-link>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400 mx-4">
        <router-link to="/" class="flex items-center gap-2 hover:text-white transition-colors" active-class="text-white">
          <HomeIcon :size="18" /> Home
        </router-link>
        <router-link to="/gallery" class="flex items-center gap-2 hover:text-white transition-colors" active-class="text-white">
          <Grid :size="18" /> Galleria
        </router-link>
        <router-link to="/how-to" class="flex items-center gap-2 hover:text-white transition-colors" active-class="text-white">
          <BookOpen :size="18" /> Guida
        </router-link>
        <a href="https://github.com/cri-venezia/cricons" target="_blank" class="hover:text-white transition-colors"><CodeXml /></a>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white p-2">
        <X v-if="isMenuOpen" />
        <Menu v-else />
      </button>
    </nav>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden fixed inset-x-4 top-24 z-40 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl flex flex-col gap-2">
        <router-link to="/" class="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all" active-class="bg-white/10 text-white font-bold" @click="isMenuOpen = false">
           <HomeIcon :size="20" /> Home
        </router-link>
        <router-link to="/gallery" class="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all" active-class="bg-white/10 text-white font-bold" @click="isMenuOpen = false">
           <Grid :size="20" /> Galleria
        </router-link>
        <router-link to="/how-to" class="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all" active-class="bg-white/10 text-white font-bold" @click="isMenuOpen = false">
           <BookOpen :size="20" /> Guida
        </router-link>
        <div class="h-px bg-slate-800 my-2"></div>
        <a href="https://github.com/cri-venezia/cricons" target="_blank" class="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all">
           <CodeXml :size="20" /> GitHub
        </a>
      </div>
    </transition>

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
