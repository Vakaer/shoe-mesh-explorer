import { ShoeStore, useShoeStore } from "../hooks/use-shoe-store"
import { HexColorPicker } from "react-colorful"

export function Picker() {
  const {current, items} = useShoeStore() as ShoeStore;
  console.log("current", current)
  return (
    <div style={{ display: current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={current ? items[current] : ''} onChange={(color: string) => current && (items[current] = color)} />
      <h1>{current}</h1>
    </div>
  )
}
