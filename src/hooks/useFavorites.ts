import { useState } from 'react'

type Favorites = Record<string, string[]>

function load(): Favorites {
  try {
    return JSON.parse(localStorage.getItem('favorites') ?? '{}')
  } catch {
    return {}
  }
}

function save(favorites: Favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export function useFavorites(profession: string | null) {
  const [favorites, setFavorites] = useState<Favorites>(load)

  const profFavorites = new Set(profession ? (favorites[profession] ?? []) : [])

  function toggle(recipe: string) {
    if (!profession) return
    setFavorites(curr => {
      const set = new Set(curr[profession] ?? [])
      set.has(recipe) ? set.delete(recipe) : set.add(recipe)
      const next = { ...curr, [profession]: [...set] }
      save(next)
      return next
    })
  }

  return { profFavorites, toggle }
}
