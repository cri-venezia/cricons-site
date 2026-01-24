<script setup lang="ts">
import { ArrowRight, Zap, Layers, Globe } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-24 animate-fade-in">
    <!-- Hero Section -->
    <section class="max-w-5xl mx-auto text-center space-y-8 pt-12 md:pt-24">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        v1.0.0 Now Available
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-white">
        Icone Mediche per<br/>
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Il Tuo Prossimo Progetto
        </span>
      </h1>
      
      <p class="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Una collezione open-source di icone vettoriali progettate per applicazioni mediche e sanitarie.
        Perfette per React, Vue, e React Native.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <router-link 
          to="/gallery" 
          class="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
        >
          Sfoglia Galleria
          <ArrowRight :size="20" />
        </router-link>
        <router-link 
          to="/how-to" 
          class="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all border border-slate-700 hover:border-slate-600"
        >
          Documentazione
        </router-link>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      <div class="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 hover:border-blue-500/30 transition-colors">
        <div class="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
          <Zap :size="24" />
        </div>
        <h3 class="text-xl font-bold text-white mb-3">Estremamente Leggera</h3>
        <p class="text-slate-400">SVG ottimizzati e tree-shakable. Importa solo quello che usi per mantenere il bundle piccolo.</p>
      </div>

      <div class="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 hover:border-purple-500/30 transition-colors">
        <div class="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
          <Layers :size="24" />
        </div>
        <h3 class="text-xl font-bold text-white mb-3">Multi-Framework</h3>
        <p class="text-slate-400">Supporto nativo per Vue, React e React Native. Componenti pronti all'uso.</p>
      </div>

      <div class="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 hover:border-green-500/30 transition-colors">
        <div class="w-12 h-12 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center mb-6">
          <Globe :size="24" />
        </div>
        <h3 class="text-xl font-bold text-white mb-3">CDN & Webfonts</h3>
        <p class="text-slate-400">Usa le icone via CDN veloce o includi il foglio di stile CSS per progetti web statici.</p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-4xl mx-auto text-center py-16 px-4">
      <div class="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 p-12 rounded-3xl backdrop-blur-sm">
        <h2 class="text-3xl font-bold text-white mb-4">Pronto a iniziare?</h2>
        <p class="text-slate-400 mb-8">Installa la libreria via npm o usa il CDN. È gratis e open source.</p>
        <div class="bg-black/50 p-4 rounded-xl border border-slate-800 inline-block text-left mx-auto">
             <code class="text-pink-400 font-mono">npm install @criven/cricons</code>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
