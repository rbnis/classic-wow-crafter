const PROFESSION_ICONS: Record<string, string> = {
  Alchemy: 'trade_alchemy',
  Blacksmithing: 'trade_blacksmithing',
  Enchanting: 'trade_engraving',
  Engineering: 'trade_engineering',
  Leatherworking: 'trade_leatherworking',
  Tailoring: 'trade_tailoring',
}

interface Props {
  selectedProfession: string | null
  setSelectedProfession: (profession: string) => void
  craftingProfessions: string[]
}

export default function ProfessionsGrid({ setSelectedProfession, craftingProfessions, selectedProfession }: Props) {
  return (
    <div className="professions-scroll flex gap-3 overflow-x-auto pb-2 justify-start sm:justify-center">
      {craftingProfessions.map((prof) => {
        const icon = PROFESSION_ICONS[prof]
        const active = selectedProfession === prof
        return (
          <button
            key={prof}
            onClick={() => setSelectedProfession(prof)}
            className={`flex flex-col items-center gap-1 shrink-0 rounded-lg p-2 border transition-colors ${
              active
                ? 'border-blue-600 bg-blue-600/10'
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            aria-label={prof}
            aria-pressed={active}
          >
            <img
              src={`https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`}
              alt={prof}
              className="w-10 h-10 rounded"
            />
            <span className={`text-xs font-medium ${active ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}>
              {prof}
            </span>
          </button>
        )
      })}
    </div>
  )
}
