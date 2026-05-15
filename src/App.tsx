import { useState } from 'react'
import ProfessionsGrid from './components/ProfessionsGrid'
import Reagents from './components/Reagents'
import Calculator from './components/Calculator'
import type { ProfessionData } from './types'
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

function App() {
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null)
  const [items, setItems] = useState<Record<string, number>>({})

  const activeData: ProfessionData = craftingProfessions[selectedProfession ?? ''] ?? {}

  const reagents: Record<string, number> = {}
  for (const item in items) {
    const itemData = activeData[item]
    if (!itemData || !(items[item] > 0)) continue
    for (const reagent in itemData.reagents) {
      const reagentName = reagent.split('/').at(-1)!
      const qty = items[item] * itemData.reagents[reagent]
      reagents[reagentName] = (reagents[reagentName] ?? 0) + qty
    }
  }
  const reagentsLength = Object.values(reagents).filter(v => v > 0).length

  const layoutClass = 'max-w-[800px] mx-auto w-full flex flex-col px-8 py-8'

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className={`${layoutClass} gap-4 pb-0 sm:pb-8`}>
        <h1 className="text-3xl font-bold">Classic WoW Crafting Calculator</h1>
        <p>I want to craft 6 X and 4 Y and 8 Z... So what reagents do I need?</p>
        <ol>
          <li>Select your profession.</li>
          <li>Enter the quantity of each item you wish to craft.</li>
          <li>See what reagents you will need to complete your order.</li>
        </ol>
      </header>
      <main className={`${layoutClass} gap-8`}>
        <section className="flex flex-col gap-4">
          <ProfessionsGrid
            selectedProfession={selectedProfession}
            setSelectedProfession={(prof) => { setSelectedProfession(prof); setItems({}) }}
            craftingProfessions={Object.keys(craftingProfessions)}
          />
        </section>
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
      <footer className={`${layoutClass} gap-4`}>
        <p>
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
