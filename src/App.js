import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import Tree from './components/Tree'
import Particles from './components/Particles'

const App = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        style={{ background: '#1c1d59' }}
        camera={{ position: [0, 0, 8] }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <group>
          <Suspense fallback={null}>
            <Tree position={[0, -2, 0]} />
          </Suspense>
          <mesh>
            <sphereGeometry args={[3, 32, 32]} />
            <meshStandardMaterial
              opacity={0.3}
              transparent
              depthWrite={false}
            />
          </mesh>
          <Particles />
          <mesh position={[0, -3, 0]}>
            <boxGeometry args={[3, 1, 3]} />
            <meshStandardMaterial color="#6a6ac4" />
          </mesh>
        </group>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  )
}

export default App
