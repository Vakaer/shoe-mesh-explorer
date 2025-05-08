import { useGLTF } from "@react-three/drei";
import { RefObject, useLayoutEffect, useRef } from "react";
import { JSX } from "react/jsx-runtime";
import * as THREE from 'three';
import { GLTFParser } from "three/examples/jsm/Addons.js";
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib'

export interface GLTF {
  animations: THREE.AnimationClip[]
  scene: THREE.Group
  scenes: THREE.Group[]
  cameras: THREE.Camera[]
  asset: {
    copyright?: string
    generator?: string
    version?: string
    minVersion?: string
  }
  parser: GLTFParser
}

export type ObjectMap = {
  nodes: {
    [name: string]: THREE.Object3D
  }
  materials: {
    [name: string]: THREE.Material
  }
}

type HeartProps = JSX.IntrinsicElements['group'] & {
  controlsRef: RefObject<ThreeOrbitControls | null>
}

export function Heart(props: HeartProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes }: ObjectMap = useGLTF('/heart_superficial_anatomy.glb')

  useLayoutEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current)
      const center = box.getCenter(new THREE.Vector3())
      groupRef.current.rotation.x = Math.PI
      groupRef.current.position.sub(center) // shift entire group so it's centered
    }
  }, [])

  const getMeshName = (object: THREE.Object3D): string | null => {
    const mesh = object as THREE.Mesh;
    if (mesh.material) {
      const material = mesh.material as THREE.MeshBasicMaterial;
      return material.name;
    }
    return null;
  };
  return (
    <group ref={groupRef}  {...props} dispose={null} scale={0.01}>
        {Object.entries(nodes).map(([key, value]) => {
          const mesh = value as THREE.Mesh;
          const material = mesh.material as THREE.MeshBasicMaterial;

          return (
            mesh.isMesh && (
              <mesh
                key={key}
                name={material.name}
                geometry={mesh.geometry}
                material={material}
                castShadow
                receiveShadow
                onPointerOver={(e) => {
                  e.stopPropagation();
                }}
                onPointerOut={(e) => {
                  if (e.intersections.length === 0) {
                    console.log('e.intersections.length', e.intersections.length)
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const name = getMeshName(e.object);
                  if (name) {
                    console.log('e.object.uuid', e.object.id)
                  }
                }}
              />
            )
          );
        })}
      </group>
  )
}

useGLTF.preload('/heart_superficial_anatomy.glb');
