export interface Recipe {
  quantities: number
  reagents: Record<string, number>
}

export type ProfessionData = Record<string, Recipe>
