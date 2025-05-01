import { ShoeStore, useShoeStore } from "../hooks/use-shoe-store";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { easing } from 'maath'
import { ReactNode } from 'react';
import * as THREE from 'three'

export function CameraRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  const { intro } = useShoeStore() as ShoeStore;
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}