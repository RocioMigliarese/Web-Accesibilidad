// Types shared across the entire app
export type HexColor = string

export interface RGB {
  r: number
  g: number
  b: number
}

export interface NavItem {
  path: string
  label: string
  icon: string
  description: string
}
