import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib'
import './App.css'
import { Annotation, Annotations } from './modules/shoe/Annotations'
import { Heart } from './modules/shoe/Heart'

function App() {
  const controlsRef = useRef<ThreeOrbitControls>(null)
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null)
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current)
      const center = box.getCenter(new THREE.Vector3())
      groupRef.current.rotation.x = Math.PI
      groupRef.current.position.sub(center)
    }
  }, [])

  useEffect(() => {
    if (selectedAnnotation) {
      const utterance = new window.SpeechSynthesisUtterance(
        `${selectedAnnotation.title}. ${selectedAnnotation.description}`
      );
      window.speechSynthesis.cancel(); // Stop any previous speech
      window.speechSynthesis.speak(utterance);
    }
  }, [selectedAnnotation]);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
        <color attach="background" args={[1, 1, 1]} />
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Heart controlsRef={controlsRef}/>
          <Annotations
            onSelectAnnotation={(annotation) => {
              setSelectedAnnotation(annotation)
              if (controlsRef.current) {
                // controlsRef.current.target.set(...annotation.)
              }
            }}
        />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
        <OrbitControls
          ref={controlsRef}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>
    </div>
  )
}

export default App
