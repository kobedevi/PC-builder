/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 memory.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Memory(props) {
  const { nodes, materials } = useGLTF('/models/Memory/memory.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.048, 0, 0]} rotation={[-Math.PI / 2, 0, 3.141]} scale={0.465}>
        <mesh geometry={nodes.Object_10.geometry} material={materials['Material.059']} />
        <mesh geometry={nodes.Object_11.geometry} material={materials['Material.060']} />
        <mesh geometry={nodes.Object_4.geometry} material={materials['Material.053']} />
        <mesh geometry={nodes.Object_5.geometry} material={materials['Material.054']} />
        <mesh geometry={nodes.Object_6.geometry} material={materials['Material.055']} />
        <mesh geometry={nodes.Object_7.geometry} material={materials['Material.056']} />
        <mesh geometry={nodes.Object_8.geometry} material={materials['Material.057']} />
        <mesh geometry={nodes.Object_9.geometry} material={materials['Material.058']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Memory/memory.glb')
