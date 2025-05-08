import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";

export const useHeartModel = () => useGLTF('/heart_superficial_anatomy.glb') as ObjectMap;