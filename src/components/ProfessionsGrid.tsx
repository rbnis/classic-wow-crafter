interface Props {
  selectedProfession: string | null
  setSelectedProfession: (profession: string) => void
  craftingProfessions: string[]
}

export default function ProfessionsGrid({ setSelectedProfession, craftingProfessions, selectedProfession }: Props) {
  return (
    <>
      <h3 className="text-lg font-semibold">Select Profession</h3>
      <div className="grid grid-cols-2 gap-4">
        {craftingProfessions.map((prof) => (
          <button
            key={prof}
            onClick={() => setSelectedProfession(prof)}
            className={`w-full py-3 rounded border font-medium transition-colors ${
              selectedProfession === prof
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {prof}
          </button>
        ))}
      </div>
    </>
  )
}
