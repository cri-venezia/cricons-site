<script setup lang="ts">
import { ref } from 'vue'
import { Code, Box, Smartphone, Layers } from 'lucide-vue-next'

const activeTab = ref('vue')

const frameworks = [
  { id: 'vue', name: 'Vue.js', icon: Layers, status: 'Ready' },
  { id: 'react', name: 'React', icon: Code, status: 'Ready' },
  { id: 'rn', name: 'React Native', icon: Smartphone, status: 'In Research' },
  { id: 'svg', name: 'Raw SVG', icon: Box, status: 'Ready' }
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
    
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-bold text-white">How to use Cricons</h1>
      <p class="text-slate-400 text-lg">Simple guides for your favorite frameworks.</p>
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
      <div v-if="activeTab === 'vue'" class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Installation</h2>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <code class="text-pink-400 font-mono">npm install cricons</code>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Usage (Global)</h2>
          <p class="text-slate-400 mb-2">Import components directly in your Vue app.</p>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <pre class="text-sm font-mono text-slate-300">
<span class="text-pink-400">import</span> { <span class="text-blue-400">BloodFilled</span> } <span class="text-pink-400">from</span> <span class="text-green-400">'cricons'</span>

<span class="text-slate-500">&lt;!-- Pattern: Name + Variant --&gt;</span>
<span class="text-blue-300">&lt;BloodFilled /&gt;</span>
<span class="text-blue-300">&lt;BloodOutline /&gt;</span></pre>
          </div>
        </div>
      </div>

      <!-- React -->
      <div v-if="activeTab === 'react'" class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Installation</h2>
          <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <code class="text-pink-400 font-mono">npm install cricons</code>
          </div>
        </div>

        <div>
           <h2 class="text-2xl font-bold text-white mb-4">Usage</h2>
           <p class="text-slate-400 mb-2">Import from the React submodule.</p>
           <div class="bg-black/50 p-4 rounded-xl border border-slate-800">
             <pre class="text-sm font-mono text-slate-300">
<span class="text-pink-400">import</span> { <span class="text-blue-400">BloodFilled</span> } <span class="text-pink-400">from</span> <span class="text-green-400">'cricons/react'</span>

<span class="text-pink-400">export default</span> <span class="text-blue-400">function</span> <span class="text-yellow-400">App</span>() {
  <span class="text-pink-400">return</span> (
    <span class="text-blue-300">&lt;BloodFilled <span class="text-purple-300">className</span>="w-8 h-8 text-red-500" /&gt;</span>
  )
}</pre>
           </div>
        </div>
      </div>

      <!-- React Native -->
      <div v-if="activeTab === 'rn'" class="space-y-6 text-center py-10">
          <div class="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto text-purple-400 mb-4">
            <Smartphone :size="32" />
         </div>
         <h2 class="text-2xl font-bold text-white">Native Mobile Support</h2>
         <p class="text-slate-400 max-w-lg mx-auto">
            Support for React Native (via react-native-svg) is being researched.
            We plan to export a compatible component library soon.
         </p>
         <div class="bg-purple-500/10 border border-purple-500/20 text-purple-400 p-4 rounded-xl inline-block text-sm">
            🧪 Status: <strong>Research Phase</strong>
         </div>
      </div>

      <!-- Raw SVG -->
      <div v-if="activeTab === 'svg'" class="space-y-8">
         <h2 class="text-2xl font-bold text-white mb-4">Raw SVG Use</h2>
         <p class="text-slate-400">
            You can download individual SVGs from the <router-link to="/" class="text-blue-400 hover:underline">Gallery</router-link>.
            Currently there is no CDN, but you can copy the raw SVG code directly from the modal.
         </p>
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
