import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const white = new THREE.Color('white')

const randomBetween = (min, max) => Math.random() * (max - min + 1) + min

const getPositionInSphere = () => {
  const x = randomBetween(-2, 2)
  const y = randomBetween(-2, 2)
  const z = randomBetween(-2, 2)
  const mag = Math.sqrt(x * x + y * y + z * z)
  const d = randomBetween(0, 2) / mag
  return [x * d, y * d, z * d]
}

const Particles = ({ quantity = 500, rotationK = 1 }) => {
  const [positions, colors] = useMemo(() => {
    const positions = []
    ;[...new Array(quantity)].forEach((i) => {
      positions.push(...getPositionInSphere())
    })

    const colors = [...new Array(quantity)].flatMap(() => white.toArray())
    return [new Float32Array(positions), new Float32Array(colors)]
  }, [quantity])

  const points = useRef(null)

  useFrame(({ clock }) => {
    points.current.rotation.y = clock.getElapsedTime() * rotationK * 0.5
  })

  return (
    <points ref={points}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} />
    </points>
  )
}

const ParticleGroup = () => (
  <group>
    <Particles />
    <Particles rotationK={-1} />
  </group>
)

export default ParticleGroup
