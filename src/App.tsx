import { useState } from 'react'
import ProfessionsGrid from './components/ProfessionsGrid'
import Reagents from './components/Reagents'
import Calculator from './components/Calculator'
import HelpModal from './components/HelpModal'
import type { ProfessionData, ReagentEntry } from './types'
import AlchemyData from './assets/alchemy.json'
import BlacksmithingData from './assets/blacksmithing.json'
import EnchantingData from './assets/enchanting.json'
import EngineeringData from './assets/engineering.json'
import LeatherworkingData from './assets/leatherworking.json'
import TailoringData from './assets/tailoring.json'

const craftingProfessions: Record<string, ProfessionData> = {
  Alchemy: AlchemyData as ProfessionData,
  Blacksmithing: BlacksmithingData as ProfessionData,
  Enchanting: EnchantingData as ProfessionData,
  Engineering: EngineeringData as ProfessionData,
  Leatherworking: LeatherworkingData as ProfessionData,
  Tailoring: TailoringData as ProfessionData,
}

const contentClass = 'max-w-[800px] mx-auto w-full px-6'

function App() {
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null)
  const [items, setItems] = useState<Record<string, number>>({})
  const [helpOpen, setHelpOpen] = useState(false)

  const activeData: ProfessionData = craftingProfessions[selectedProfession ?? ''] ?? {}

  const reagents: Record<string, ReagentEntry> = {}
  for (const item in items) {
    const itemData = activeData[item]
    if (!itemData || !(items[item] > 0)) continue
    for (const reagentUrl in itemData.reagents) {
      const slug = reagentUrl.split('/').at(-1)!
      const qty = items[item] * itemData.reagents[reagentUrl]
      if (slug in reagents) {
        reagents[slug].qty += qty
      } else {
        reagents[slug] = { url: reagentUrl, qty }
      }
    }
  }
  const reagentsLength = Object.values(reagents).filter(e => e.qty > 0).length

  return (
    <div className="min-h-dvh bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}

      <header>
        <div className={`${contentClass} flex items-center justify-between py-3`}>
          <h1 className="text-lg font-bold">Classic WoW Crafting Calculator</h1>
          <button
            onClick={() => setHelpOpen(true)}
            className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-sm font-semibold hover:opacity-70 transition-opacity"
            aria-label="Help"
          >
            ?
          </button>
        </div>
      </header>

      <main className={`${contentClass} py-8 flex flex-col gap-8`}>
        <ProfessionsGrid
          selectedProfession={selectedProfession}
          setSelectedProfession={(prof) => { setSelectedProfession(prof); setItems({}) }}
          craftingProfessions={Object.keys(craftingProfessions)}
        />
        <section className="flex flex-col gap-4" style={{ opacity: selectedProfession ? 1 : 0.4 }}>
          <Reagents reagentsLength={reagentsLength} reagents={reagents} />
          <Calculator
            key={selectedProfession}
            items={items}
            setItems={setItems}
            selectedProfession={selectedProfession}
            recipeData={activeData}
          />
        </section>
      </main>

      <footer className={`${contentClass} py-6`}>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Made by{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/rbnis">rbnis</a>.
          {' '}Based on work by{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.smoljames.com">Smoljames</a>.
        </p>
      </footer>
    </div>
  )
}

export default App
