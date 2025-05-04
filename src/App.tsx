import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import './App.css'
import { Shoe } from './modules/shoe'
import { Picker } from './modules/shoe/components/picker'

function App() {
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div
        className='absolute flex justify-between gap-3 items-start'
          style={{
            zIndex: 1000,
          }}
        >
          <Picker />
          <select
            value={transformMode}
            onChange={(e) => setTransformMode(e.target.value as 'translate' | 'rotate' | 'scale')}
            className='p-2 block border border-1 border-slate-300 m-3 rounded-md focus:outline-none:'
          >
            <option value="translate">Translate</option>
            <option value="rotate">Rotate</option>
            <option value="scale">Scale</option>
          </select>
      </div>

      <Canvas shadows camera={{ position: [0, 0, 4], near: 0.1, far: 1000, fov: 45 }}>
        <color attach="background" args={[1, 1, 1]} />
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Shoe
          transformMode={transformMode}
        />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default App
