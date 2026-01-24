<script setup lang="ts">
import { ref } from 'vue'
import { Code, Box, Smartphone, Layers } from 'lucide-vue-next'

const activeTab = ref('vue')

const frameworks = [
  { id: 'vue', name: 'Vue.js', icon: Layers, status: 'Ready' },
  { id: 'react', name: 'React', icon: Code, status: 'Ready' },
  { id: 'rn', name: 'React Native', icon: Smartphone, status: 'Ready' },
  { id: 'svg', name: 'Raw SVG', icon: Box, status: 'Ready' },
  { id: 'cdn', name: 'CDN / Webfonts', icon: Box, status: 'Ready' }
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
    
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-bold text-white">Come usare Cricons</h1>
      <p class="text-slate-400 text-lg">Guide semplici per i tuoi framework preferiti.</p>
    </div>

    <!-- Framework Tabs -->
    <div class="flex flex-wrap justify-center gap-4">
      <button 
        v-for="fw in frameworks" 
        :key="fw.id"
        class="flex items-center gap-3 px-6 py-3 rounded-xl border transition-all"
        :class="activeTab === fw.id 
          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
          : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'"
        @click="activeTab = fw.id"
      >
        <component :is="fw.icon" :size="20" />
        <div class="flex flex-col items-start">
            <span class="font-bold leading-none">{{ fw.name }}</span>
            <span class="text-[10px] opacity-75 font-mono">{{ fw.status }}</span>
        </div>
      </button>
    </div>

    <!-- Content Area -->
    <div class="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 min-h-[400px]">
      
      <!-- Vue -->
      <!-- Vue -->
      <div v-if="activeTab === 'vue'" class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Installazione</h2>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <code class="text-pink-400 font-mono">npm install cricons-vue</code>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Utilizzo (Globale)</h2>
          <p class="text-slate-400 mb-2">Importa i componenti direttamente nella tua app Vue.</p>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <pre class="text-sm font-mono text-slate-300">
<span class="text-pink-400">import</span> { <span class="text-blue-400">BloodFilled</span> } <span class="text-pink-400">from</span> <span class="text-green-400">'cricons-vue'</span>

<span class="text-slate-500">&lt;!-- Pattern: Nome + Variante --&gt;</span>
<span class="text-blue-300">&lt;BloodFilled /&gt;</span>
<span class="text-blue-300">&lt;BloodOutline /&gt;</span></pre>
          </div>
        </div>

        <div class="mt-8 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 class="text-xl font-bold text-white mb-4">Ottimizzazione (Global Registration)</h3>
            <p class="text-slate-400 mb-4">
              Se vuoi usare molte icone senza importarle ogni volta, puoi registrarle globalmente nel `main.ts`.
              Usa `createCricons` per includere solo quelle che ti servono e mantenere il bundle leggero.
            </p>
            <div class="bg-black/50 p-4 rounded-lg overflow-x-auto">
              <code class="text-sm font-mono text-slate-300">
                <span class="text-purple-400">import</span> { createApp } <span class="text-purple-400">from</span> 'vue'<br/>
                <span class="text-purple-400">import</span> App <span class="text-purple-400">from</span> './App.vue'<br/>
                <span class="text-purple-400">import</span> { createCricons, BloodFilled, HeartOutline } <span class="text-purple-400">from</span> 'cricons-vue'<br/><br/>
                
                <span class="text-slate-500">// Registra solo le icone che usi davvero</span><br/>
                <span class="text-purple-400">const</span> cricons = <span class="text-blue-400">createCricons</span>({<br/>
                &nbsp;&nbsp;icons: {<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;BloodFilled,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;HeartOutline<br/>
                &nbsp;&nbsp;}<br/>
                })<br/><br/>
                
                createApp(App).use(cricons).mount('#app')
              </code>
            </div>
        </div>
      </div>

      <!-- React -->
      <div v-if="activeTab === 'react'" class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Installazione</h2>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <code class="text-pink-400 font-mono">npm install cricons-react</code>
          </div>
        </div>

        <div>
           <h2 class="text-2xl font-bold text-white mb-4">Utilizzo</h2>
           <p class="text-slate-400 mb-2">Importa dal pacchetto React.</p>
           <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <pre class="text-sm font-mono text-slate-300">
<span class="text-pink-400">import</span> { <span class="text-blue-400">BloodFilled</span> } <span class="text-pink-400">from</span> <span class="text-green-400">'cricons-react'</span>

<span class="text-pink-400">export default</span> <span class="text-blue-400">function</span> <span class="text-yellow-400">App</span>() {
  <span class="text-pink-400">return</span> (
    <span class="text-blue-300">&lt;BloodFilled <span class="text-purple-300">className</span>="w-8 h-8 text-red-500" /&gt;</span>
  )
}</pre>
           </div>
        </div>
      </div>

      <!-- React Native -->
      <div v-if="activeTab === 'rn'" class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Installazione</h2>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <code class="text-pink-400 font-mono">npm install cricons-native react-native-svg</code>
          </div>
        </div>

        <div>
           <h2 class="text-2xl font-bold text-white mb-4">Utilizzo</h2>
           <p class="text-slate-400 mb-2">Importa dal pacchetto Native.</p>
           <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <pre class="text-sm font-mono text-slate-300">
<span class="text-pink-400">import</span> { <span class="text-blue-400">BloodFilled</span> } <span class="text-pink-400">from</span> <span class="text-green-400">'cricons-native'</span>

<span class="text-pink-400">export default</span> <span class="text-blue-400">function</span> <span class="text-yellow-400">App</span>() {
  <span class="text-pink-400">return</span> (
    <span class="text-blue-300">&lt;BloodFilled <span class="text-purple-300">width</span>={32} <span class="text-purple-300">height</span>={32} <span class="text-purple-300">color</span>="red" /&gt;</span>
  )
}</pre>
           </div>
        </div>
      </div>

      <div v-if="activeTab === 'svg'" class="space-y-8">
         <h2 class="text-2xl font-bold text-white mb-4">Uso SVG Raw</h2>
         <p class="text-slate-400">
            Puoi scaricare i singoli file SVG direttamente dalla <router-link to="/gallery" class="text-blue-400 hover:underline">Galleria</router-link>.
         </p>
      </div>

      <!-- CDN / Webfonts -->
      <div v-if="activeTab === 'cdn'" class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Webfonts</h2>
          <p class="text-slate-400 mb-4">Includi il file CSS nell'head del tuo progetto.</p>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800 mb-6">
             <code class="text-green-400 font-mono text-sm break-all">
                &lt;link rel="stylesheet" href="https://cricons-cdn.art3k.org/webfonts/cricons.css" /&gt;
             </code>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-4">Utilizzo</h3>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <code class="text-blue-300 font-mono">&lt;i class="ci ci-blood-filled"&gt;&lt;/i&gt;</code>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
