import { useEffect } from 'react'
import type { ReagentEntry } from '../types'

interface Props {
  reagents: Record<string, ReagentEntry>
  reagentsLength: number
}

declare global {
  interface Window {
    $WowheadPower?: { refreshLinks: () => void }
  }
}

export default function Reagents({ reagents, reagentsLength }: Props) {
  useEffect(() => {
    window.$WowheadPower?.refreshLinks()
  }, [reagents])

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Reagents</h3>
      {reagentsLength !== 0 ? (
        <ul className="flex flex-col gap-2">
          {Object.entries(reagents)
            .filter(([, entry]) => entry.qty > 0)
            .map(([slug, { url, qty }]) => (
              <li key={slug} className="flex items-center gap-3">
                <span className="font-medium tabular-nums w-8 text-right shrink-0">{qty}</span>
                <span>×</span>
                <a href={url} className="reagent-link capitalize inline-flex items-center gap-1">
                  {slug.replaceAll('-', ' ')}
                </a>
              </li>
            ))}
        </ul>
      ) : (
        <p>No items in reagents list...</p>
      )}
    </div>
  )
}
