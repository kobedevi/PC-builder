/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 cpu.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Cpu(props) {
  const { nodes, materials } = useGLTF('/models/Cpu/cpu.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.defaultMaterial.geometry} material={materials.DefaultMaterial} position={[0, -0.037, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/Cpu/cpu.glb')
