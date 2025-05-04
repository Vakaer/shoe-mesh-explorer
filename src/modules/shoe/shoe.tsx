import { TransformControls, useGLTF } from '@react-three/drei';
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShoeStore, useShoeStore } from "../../hooks/use-shoe-store";
import { ShoePart } from "../../types/shoe-part";

type TransformMode = 'translate' | 'rotate' | 'scale';
interface ShoeProps {
  transformMode: TransformMode;
}

export const Shoe = ({ transformMode}: ShoeProps) => {
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
  const [selected, setSelected] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    const meshDiv = document.createElement("div");
    meshDiv.id = "cursor-label";
    meshDiv.style.position = "fixed";
    meshDiv.style.pointerEvents = "none";
    meshDiv.style.zIndex = "9999";
    meshDiv.style.padding = "8px 16px";
    meshDiv.style.borderRadius = "12px";
    meshDiv.style.fontSize = "18px";
    meshDiv.style.fontFamily = "Inter, sans-serif";
    meshDiv.style.color = "#000";
    meshDiv.style.background = "rgba(255, 255, 255, 0.3)";
    meshDiv.style.backdropFilter = "blur(6px)";
    meshDiv.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    meshDiv.style.transition = "opacity 0.2s ease";
    meshDiv.style.opacity = "0";

    document.body.appendChild(meshDiv);

    const moveLabel = (e: MouseEvent) => {
      meshDiv.style.left = `${e.clientX + 20}px`;
      meshDiv.style.top = `${e.clientY + 20}px`;
    };

    document.addEventListener("mousemove", moveLabel);

    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${hovered ? items[hovered as ShoePart] : 'default'}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="29.5" cy="29.5" r="24.5" fill="rgba(255,255,255,0.5)" stroke="#000"/>
        <path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
      </svg>
    `;

    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(cursor)))}') 32 32, auto`;
      meshDiv.innerText = hovered;
      meshDiv.style.opacity = "1";
    } else {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(auto)))}') 32 32, auto`;
      meshDiv.innerText = "";
      meshDiv.style.opacity = "0";
    }

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", moveLabel);
      meshDiv.remove();
    };
  }, [hovered, items]);


  const getMeshName = (object: THREE.Object3D): string | null => {
    const mesh = object as THREE.Mesh;
    if (mesh.material) {
      const material = mesh.material as THREE.MeshBasicMaterial;
      return material.name;
    }
    return null;
  };

  return (
    <group
      ref={ref}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        const name = getMeshName(e.object);
        if (name) {
          setHovered(name);
        }
      }}
      onPointerOut={(e) => {
        if (e.intersections.length === 0) {
          setHovered(null);
          setSelected(null);
        }
      }}
      onPointerMissed={() => setCurrent(null)}
      onClick={(e) => {
        e.stopPropagation();
        const name = getMeshName(e.object);
        console.log('e.object.uuid', e.object.id)
        if (name) {
          setCurrent(name as ShoePart);
          setSelected(e.object as THREE.Mesh);
        }
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
      {selected && (
        <TransformControls
          object={selected}
          mode={transformMode}
          makeDefault={false}
        />
      )}
    </group>
  );
};