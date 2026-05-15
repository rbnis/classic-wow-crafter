import { useState, useMemo, useRef } from 'react'
import type { ProfessionData } from '../types'
import { useFavorites } from '../hooks/useFavorites'

interface Props {
  items: Record<string, number>
  setItems: React.Dispatch<React.SetStateAction<Record<string, number>>>
  selectedProfession: string | null
  recipeData: ProfessionData
}

function getSortedRecipes(
  recipeData: ProfessionData,
  searchValue: string,
  items: Record<string, number>,
  favorites: Set<string>,
) {
  return Object.keys(recipeData)
    .filter(val => val.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => {
      const aSet = items[a] > 0 ? 2 : favorites.has(a) ? 1 : 0
      const bSet = items[b] > 0 ? 2 : favorites.has(b) ? 1 : 0
      return bSet - aSet
    })
}

export default function Calculator({ items, setItems, selectedProfession, recipeData }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const { profFavorites, toggle } = useFavorites(selectedProfession)

  // Capture items/favorites at sort time so quantity changes don't re-sort mid-edit.
  // The list re-sorts only when recipeData, searchValue, or favorites change.
  const itemsRef = useRef(items)
  itemsRef.current = items
  const sortedRecipes = useMemo(
    () => getSortedRecipes(recipeData, searchValue, itemsRef.current, profFavorites),
    [recipeData, searchValue, profFavorites] // eslint-disable-line react-hooks/exhaustive-deps
  ).filter(recipe => !favoritesOnly || profFavorites.has(recipe))

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Recipes</h3>
      {selectedProfession ? (
        <>
          <div className="flex gap-2">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search recipe"
              className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
            <button
              onClick={() => setFavoritesOnly(v => !v)}
              className={`px-3 rounded border transition-colors flex items-center ${
                favoritesOnly
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 dark:border-gray-600 hover:opacity-70'
              }`}
              aria-label="Show favorites only"
            >
              <i className={favoritesOnly ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
            </button>
          </div>
          {sortedRecipes.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              {favoritesOnly ? 'No favorites match your search.' : 'No recipes match your search.'}
            </p>
          )}
          {sortedRecipes.map((recipe) => (
            <div key={recipe} className="flex items-center gap-4 pr-3">
              <input
                placeholder="0"
                type="number"
                inputMode="numeric"
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
              <button
                onClick={() => toggle(recipe)}
                className="text-gray-900 dark:text-gray-100 hover:opacity-70 transition-opacity shrink-0"
                aria-label={profFavorites.has(recipe) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <i className={profFavorites.has(recipe) ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>Please select a profession...</p>
      )}
    </div>
  )
}
