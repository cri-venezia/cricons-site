<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Search as SearchIcon, 
  X as XIcon, 
  Download as DownloadIcon, 
  Copy as CopyIcon, 
  Image as ImageIcon,
  SearchX as SearchXIcon,
  Tag as TagIcon,
  Grid as GridIcon,
  Maximize2 as MaximizeIcon
} from 'lucide-vue-next'
import * as AllIcons from '@/icons'
import _metadata from '@/metadata.json'

const metadata = _metadata as Record<string, string>

const props = defineProps<{
  initialSearch?: string
}>()

const categoryMap: Record<string, string> = {
  blood: 'Sangue',
  body: 'Corpo',
  conditions: 'Malattie / Malesseri',
  contraceptives: 'Contraccezione',
  devices: 'Dispositivi',
  diagnostics: 'Diagnostica',
  emotions: 'Emozioni',
  exercise: 'Attività Fisica',
  graphs: 'Grafici',
  medications: 'Farmaci',
  nutrition: 'Nutrizione',
  objects: 'Oggetti',
  people: 'Persone',
  places: 'Luoghi',
  ppe: 'DPI',
  shapes: 'Forme',
  specialties: 'Specializzazioni',
  symbols: 'Simboli',
  typography: 'Tipografia',
  vehicles: 'Veicoli',
  zoonoses: 'Zoonosi'
}

// Map of all available components
const allIconsMap = Object.fromEntries(
  Object.entries(AllIcons).filter(([key, val]) => {
     return val && (typeof val === 'object' || typeof val === 'function')
  })
)

const iconNames = Object.keys(allIconsMap)

// State
const searchInternal = ref('')
const search = computed({
  get: () => props.initialSearch || searchInternal.value,
  set: (val) => searchInternal.value = val
})

const selectedCategory = ref('all')
const selectedBaseIcon = ref<{ name: string; variants: string[] } | null>(null)
const selectedVariant = ref<string>('')
const svgRef = ref<any>(null)

// --- Grouping Logic ---

// Helper to parse icon name
const parseIconName = (name: string) => {
  // Regex to match Base + Variant. 
  // Variants: Filled, Outline, Filled24, Outline24
  // We assume everything before the variant suffix is the Base Name.
  const match = name.match(/^(.*)(Filled|Outline)(24)?$/)
  if (match) {
    return {
      base: match[1],
      variant: match[2] + (match[3] || '') // e.g. "Filled", "Filled24"
    }
  }
  // Fallback
  return { base: name, variant: 'Default' }
}

// 1. Group names into Base -> Variants[]
const baseIconsMap = computed(() => {
  const map = new Map<string, string[]>()
  
  iconNames.forEach(fullName => {
    const { base, variant } = parseIconName(fullName)
    if (!map.has(base)) {
      map.set(base, [])
    }
    map.get(base)!.push(variant)
  })
  
  return map
})

// 2. Group Base Icons by Category for the Grid
const groupedIcons = computed(() => {
  const groups: Record<string, Array<{ base: string, variants: string[], defaultIcon: string }>> = {}
  const q = search.value.toLowerCase()

  for (const [base, variants] of baseIconsMap.value.entries()) {
    // Search Filter (matches Base Name)
    if (q && !base.toLowerCase().includes(q)) continue

    // Determine Default Icon (Priority: Filled -> Filled24 -> Outline -> Outline24 -> First Available)
    // We reconstruct the full name to check availability
    const getFullName = (v: string) => v === 'Default' ? base : `${base}${v}`
    
    // Find metadata category from any valid full name variant
    let category = 'uncategorized'
    for (const v of variants) {
      const fullName = getFullName(v)
      if (metadata[fullName]) {
        category = metadata[fullName]
        break
      }
    }

    // Determine representative icon for the grid
    let defaultVariant = variants[0]
    if (variants.includes('Filled')) defaultVariant = 'Filled'
    else if (variants.includes('Filled24')) defaultVariant = 'Filled24'
    else if (variants.includes('Outline')) defaultVariant = 'Outline'

    const defaultIconName = getFullName(defaultVariant)

    // Init Group
    if (!groups[category]) groups[category] = []

    groups[category].push({
      base,
      variants: variants.sort(), // Sort variants for consistency
      defaultIcon: defaultIconName
    })
  }

  // Filter by Selected Category
  const result: typeof groups = {}
  if (selectedCategory.value !== 'all') {
    if (groups[selectedCategory.value]) {
       result[selectedCategory.value] = groups[selectedCategory.value]
    }
  } else {
    // Sort keys
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      const indexA = Object.keys(categoryMap).indexOf(a)
      const indexB = Object.keys(categoryMap).indexOf(b)
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
    
    sortedKeys.forEach(key => {
      if (groups[key].length > 0) {
        result[key] = groups[key]
      }
    })
  }

  return result
})

const totalIconsCount = computed(() => {
  return Object.values(groupedIcons.value).reduce((acc, items) => acc + items.length, 0)
})

const currentIconName = computed(() => {
  if (!selectedBaseIcon.value) return ''
  if (selectedVariant.value === 'Default') return selectedBaseIcon.value.name
  return `${selectedBaseIcon.value.name}${selectedVariant.value}`
})

// --- Actions ---

const scrollToCategory = (key: string) => {
  selectedCategory.value = key
  if (key !== 'all') {
    setTimeout(() => {
      const el = document.getElementById(`cat-${key}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

const openModal = (base: string, variants: string[]) => {
  selectedBaseIcon.value = { name: base, variants }
  // Select default variant logic
  if (variants.includes('Filled')) selectedVariant.value = 'Filled'
  else if (variants.includes('Filled24')) selectedVariant.value = 'Filled24'
  else selectedVariant.value = variants[0]
  
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedBaseIcon.value = null
  selectedVariant.value = ''
  document.body.style.overflow = ''
}

// Utils (Copy/Download)
const getSvgElement = () => svgRef.value?.$el || svgRef.value

const downloadSVG = () => {
  const el = getSvgElement()
  if (!el) return
  const blob = new Blob([el.outerHTML], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${currentIconName.value}.svg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const copySVGCode = async () => {
  const el = getSvgElement()
  if (!el) return
  await navigator.clipboard.writeText(el.outerHTML)
  // Toast placeholder
}

const copyText = async (text: string) => {
  await navigator.clipboard.writeText(text)
  // Toast placeholder
}

const downloadPNG = (size: number) => {
  const el = getSvgElement()
  if (!el) return
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const data = (new XMLSerializer()).serializeToString(el)
  const img = new Image()
  const url = URL.createObjectURL(new Blob([data], {type: 'image/svg+xml;charset=utf-8'}))

  img.onload = () => {
    ctx.clearRect(0, 0, size, size)
    ctx.drawImage(img, 0, 0, size, size)
    URL.revokeObjectURL(url)
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `${currentIconName.value}-${size}px.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  img.src = url
}
</script>

<template>
  <div class="space-y-12 pb-20">
    
    <!-- Filters -->
    <div class="sticky top-24 z-20 flex flex-wrap gap-2 py-4 px-4 -mx-4 glass backdrop-blur-md border-y border-white/5 bg-slate-900/50 justify-center">
        <button 
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
          :class="selectedCategory === 'all' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'"
          @click="scrollToCategory('all')"
        >
          Tutte
        </button>
        <button 
          v-for="(label, key) in categoryMap" 
          :key="key"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
          :class="selectedCategory === key ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'"
          @click="scrollToCategory(key)"
        >
          {{ label }}
        </button>
    </div>

    <!-- Zero State -->
    <div v-if="Object.keys(groupedIcons).length === 0" class="text-center py-20">
      <div class="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
        <SearchXIcon :size="40" />
      </div>
      <h3 class="text-xl font-semibold text-white">Nessuna icona trovata</h3>
    </div>

    <!-- Layout Grid -->
    <div v-else class="space-y-16">
      <section 
        v-for="(items, category) in groupedIcons" 
        :key="category"
        :id="`cat-${category}`"
        class="scroll-mt-48"
      >
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-bold text-white capitalize flex items-center gap-3">
             <span class="w-2 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 block"></span>
             {{ categoryMap[category] || category }}
          </h2>
          <span class="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono border border-slate-700">
            {{ items.length }}
          </span>
          <div class="h-px bg-slate-800 flex-1"></div>
        </div>

        <div class="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 sm:gap-6">
          <div 
            v-for="item in items" 
            :key="item.base" 
            class="group relative bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-2xl p-4 flex flex-col items-center justify-center aspect-square cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm"
            @click="openModal(item.base, item.variants)"
          >
            <div class="flex-1 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors duration-300">
                <component :is="allIconsMap[item.defaultIcon]" class="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110" />
            </div>
            <div class="w-full text-center h-6 flex items-end justify-center">
              <!-- Variant badges -->
              <div class="flex justify-center gap-1.5">
                 <span v-if="item.variants.length > 1" class="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400 border border-slate-600/50 w-auto">
                    +{{ item.variants.length - 1 }}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal -->
    <Transition 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-8 scale-95"
    >
      <div v-if="selectedBaseIcon" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" @click.self="closeModal">
        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
        
        <div class="relative bg-slate-900 border border-slate-700/50 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-black/50">
          
          <button class="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors z-20" @click="closeModal">
            <XIcon :size="24" />
          </button>

          <!-- Left: Preview & Variant Selector -->
          <div class="w-full md:w-5/12 bg-slate-950/50 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-slate-800 relative group justify-between">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#475569 1px, transparent 1px); background-size: 20px 20px;"></div>
            
            <div class="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[250px]">
               <component 
                  :is="allIconsMap[currentIconName]" 
                  class="w-32 h-32 md:w-48 md:h-48 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                  ref="svgRef" 
                />
            </div>
            
            <!-- Variant Selector -->
            <div class="relative z-10 mt-6 grid grid-cols-2 gap-2">
               <button 
                  v-for="v in selectedBaseIcon.variants" 
                  :key="v"
                  class="px-3 py-2 rounded-lg text-sm font-medium transition-all border flex items-center justify-center gap-2"
                  :class="selectedVariant === v 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'"
                  @click="selectedVariant = v"
               >
                  {{ v.replace('24', ' 24px') }}
               </button>
            </div>
          </div>
          
          <!-- Right: Details -->
          <div class="w-full md:w-7/12 p-6 md:p-8 flex flex-col bg-slate-900 overflow-y-auto">
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-white break-all tracking-tight">{{ selectedBaseIcon.name }}</h2>
              <p class="text-slate-400 mt-1 flex items-center gap-2">
                 <TagIcon :size="14" />
                 {{ categoryMap[metadata[currentIconName] as string] || metadata[currentIconName] || 'Altro' }}
              </p>
            </div>
            
            <!-- Actions -->
            <div class="grid grid-cols-2 gap-3 mb-8">
              <button 
                class="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-600/30 hover:-translate-y-0.5" 
                @click="copySVGCode"
              >
                <CopyIcon :size="16" /> Copia SVG
              </button>
              <button 
                class="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 rounded-xl font-medium transition-all" 
                @click="downloadSVG"
              >
                <DownloadIcon :size="18" /> Scarica SVG
              </button>
              <button class="col-span-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors border border-slate-700/50" @click="downloadPNG(48)">
                <ImageIcon :size="16" /> PNG 48
              </button>
              <button class="col-span-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors border border-slate-700/50" @click="downloadPNG(96)">
                <ImageIcon :size="16" /> PNG 96
              </button>
            </div>
            
            <!-- Code Snippets -->
            <div class="space-y-6 flex-1">
              <!-- Vue -->
              <div>
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">Vue.js Usage</h3>
                <div class="space-y-2">
                  <div class="bg-black/40 border border-slate-800 rounded-xl p-0.5 relative group">
                     <div class="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button class="p-1.5 bg-slate-700 text-slate-300 rounded hover:bg-blue-600 hover:text-white" @click="copyText(`<CRIcon name='${currentIconName}' />`)">
                            <CopyIcon :size="14" />
                         </button>
                     </div>
                     <code class="block p-4 text-sm font-mono text-blue-300 overflow-x-auto">
                        &lt;CRIcon <span class="text-purple-300">name</span>="{{ currentIconName }}" /&gt;
                     </code>
                  </div>
                  <div class="bg-black/40 border border-slate-800 rounded-xl p-0.5 relative group">
                     <div class="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button class="p-1.5 bg-slate-700 text-slate-300 rounded hover:bg-blue-600 hover:text-white" @click="copyText(`import { ${currentIconName} } from 'cricons'`)">
                            <CopyIcon :size="14" />
                         </button>
                     </div>
                     <code class="block p-4 text-sm font-mono text-pink-300 overflow-x-auto">
                        import <span class="text-white">{ {{ currentIconName }} }</span> from 'cricons'
                     </code>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Scrollbar hide for modal if needed */
</style>

