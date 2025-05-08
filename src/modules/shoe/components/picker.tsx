import { ShoeStore, useShoeStore } from "../../../hooks/use-shoe-store"
import { HexColorPicker } from "react-colorful"

export function Picker() {
  const {current, items} = useShoeStore() as ShoeStore;

  return (
    <div style={{ display: current ? "block" : "none", margin: '1rem' }}>
      <HexColorPicker className="picker" color={current ? items[current] : ''} onChange={(color: string) => current && (items[current] = color)} />
      <h1 className="text-2xl mt-4 font-mono">{current}</h1>
    </div>
  )
}
