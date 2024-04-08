import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Librov3.glb')
  const { actions, names } = useAnimations(animations, group)
  const [clicked, setClicked] = useState(false)
  const { camera } = useThree();
  const targetX = useRef();

  useEffect(() => {
    const fovWidth = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
    targetX.current = fovWidth / 2;
    camera.position.x = targetX.current;
    if (clicked) {
      actions[names[0]].clampWhenFinished = true;
      actions[names[0]].reset().play().setLoop(THREE.LoopOnce);
    }
  }, [clicked, camera, actions, names]);

  useFrame(() => {
    if (clicked && camera.position.x > -2) {
      camera.position.x -= 0.28;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} onClick={() => {setClicked(true); props.hideCuadroInicio();}}>
      <group name="Scene">
        <group name="ArmatureLibro" scale={[-20, 20, -20]}>
          <primitive object={nodes.ROOT_ROTATION} />
          <primitive object={nodes.ROTATION_MID01} />
          <primitive object={nodes.ROTATION_BOT} />
          <skinnedMesh name="Cover" geometry={nodes.Cover.geometry} material={materials.Libro} skeleton={nodes.Cover.skeleton} />
          <skinnedMesh name="Pages" geometry={nodes.Pages.geometry} material={materials.Libro} skeleton={nodes.Pages.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Librov3.glb')