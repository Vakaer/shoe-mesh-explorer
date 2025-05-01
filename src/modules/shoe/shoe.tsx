import { useShoeStore, ShoeStore } from './hooks/use-shoe-store';
import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ShoePart } from "../../types/shoe-part";
import { easing } from 'maath'

export const Shoe = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { items, setCurrent } = useShoeStore() as ShoeStore;
  const { nodes, materials } = useGLTF('shoe-draco.glb') as unknown as {
    nodes: {
      shoe: THREE.Mesh;
      shoe_1: THREE.Mesh;
      shoe_2: THREE.Mesh;
      shoe_3: THREE.Mesh;
      shoe_4: THREE.Mesh;
      shoe_5: THREE.Mesh;
      shoe_6: THREE.Mesh;
      shoe_7: THREE.Mesh;
    };
    materials: {
      laces: THREE.Material;
      mesh: THREE.Material;
      caps: THREE.Material;
      inner: THREE.Material;
      sole: THREE.Material;
      stripes: THREE.Material;
      band: THREE.Material;
      patch: THREE.Material;
    };
  };
  const [hovered, setHovered] = useState<string | null>(null);

  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime();
  //   if(ref.current) {
  //     ref.current.rotation.set(
  //       Math.cos(t / 4) / 8,
  //       Math.sin(t / 4) / 8,
  //       -0.2 - (1 + Math.sin(t / 1.5)) / 20
  //     );
  //     ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  //   }
  // });

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${hovered ? items[hovered as ShoePart] : 'default'}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered || ''}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`;
      return () => {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`;
      };
    }
  }, [hovered, items]);

  return (
    <group
      ref={ref}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        const mesh = (e.object.getObjectByName(e.object.name) as THREE.Mesh).material as THREE.MeshStandardMaterial;
        setHovered(mesh.name);
        console.log(mesh);
      }}
      onPointerOut={(e) => {
        if (e.intersections.length === 0) setHovered(null);
      }}
      onPointerMissed={() => setCurrent(null)}
      onClick={(e) => {
        e.stopPropagation();
        const mesh = (e.object.getObjectByName(e.object.name) as THREE.Mesh).material as THREE.MeshStandardMaterial;
        setCurrent(mesh.name as ShoePart);
      }}
    >
      <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color={items.laces} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={items.mesh} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={items.caps} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={items.inner} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={items.sole} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={items.stripes} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color={items.band} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={items.patch} />
    </group>
  );
};