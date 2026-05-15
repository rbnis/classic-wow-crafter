import { useState, useMemo, useRef } from 'react'
import type { ProfessionData } from '../types'

interface Props {
  items: Record<string, number>
  setItems: React.Dispatch<React.SetStateAction<Record<string, number>>>
  selectedProfession: string | null
  recipeData: ProfessionData
}

function getSortedRecipes(recipeData: ProfessionData, searchValue: string, items: Record<string, number>) {
  return Object.keys(recipeData)
    .filter(val => val.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => {
      const aSet = items[a] > 0 ? 1 : 0
      const bSet = items[b] > 0 ? 1 : 0
      return bSet - aSet
    })
}

export default function Calculator({ items, setItems, selectedProfession, recipeData }: Props) {
  const [searchValue, setSearchValue] = useState('')
  // Capture items at sort time so quantity changes don't re-sort mid-edit.
  // The list re-sorts only when recipeData or searchValue changes.
  const itemsRef = useRef(items)
  itemsRef.current = items
  const sortedRecipes = useMemo(
    () => getSortedRecipes(recipeData, searchValue, itemsRef.current),
    [recipeData, searchValue] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Recipes</h3>
      {selectedProfession ? (
        <>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search recipe"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          />
          {sortedRecipes.map((recipe) => (
            <div key={recipe} className="flex items-center gap-4">
              <input
                placeholder=""
                type="number"
                value={items[recipe] || ''}
                onChange={(e) => {
                  setItems(curr => ({ ...curr, [recipe]: Number(e.target.value) }))
                }}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-center bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
              <i className="fa-solid fa-xmark" />
              <p className="flex-1">
                {recipe}{recipeData[recipe].quantities !== 1 ? ` (${recipeData[recipe].quantities})` : ''}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>Please select a profession...</p>
      )}
    </div>
  )
}
