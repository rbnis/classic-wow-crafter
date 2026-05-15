interface Props {
  reagents: Record<string, number>
  reagentsLength: number
}

export default function Reagents({ reagents, reagentsLength }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Reagents</h3>
      {reagentsLength !== 0 ? (
        <ul className="flex flex-col gap-1">
          {Object.entries(reagents)
            .filter(([, qty]) => qty > 0)
            .map(([name, qty]) => (
              <li key={name} className="capitalize">
                {qty} - {name.replaceAll('-', ' ')}
              </li>
            ))}
        </ul>
      ) : (
        <p>No items in reagents list...</p>
      )}
    </div>
  )
}
