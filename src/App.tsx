import { Center, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import './App.css'
import { Shoe } from './modules/shoe'
import { Backdrop } from './modules/shoe/components/bakcdrop'
import { CameraRig } from './modules/shoe/components/camera-rig'
import { Picker } from './modules/shoe/components/picker'

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 4], near: 0.1, far: 1000, fov: 45 }}>
        <ambientLight intensity={0.7} />
        {/* <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow /> */}
        <CameraRig>
          <Backdrop  />
          <Center>
            <Shoe />
          </Center>
        </CameraRig>
        <Environment preset="city" />
        {/* <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} /> */}
        {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} /> */}
      </Canvas>
      <Picker />
    </>
  )
}

export default App
