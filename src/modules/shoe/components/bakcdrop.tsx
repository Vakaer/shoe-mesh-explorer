import { ShoeStore, useShoeStore } from "../hooks/use-shoe-store";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { easing } from 'maath'
import { useRef } from "react"

export function Backdrop() {
  const {color} = useShoeStore() as ShoeStore;
  const shadows = useRef(null!)
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, color, 0.25, delta))
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={3}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}