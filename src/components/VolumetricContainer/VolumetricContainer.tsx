import styles from './VolumetricContainer.module.scss';
import React, { useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Edges } from '@react-three/drei';
import * as THREE from 'three';

function useThemeColors() {
  const [theme, setTheme] = useState(document.body.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme === 'dark' 
    ? { wireframe: '#ffffff', background: '#080808' }
    : { wireframe: '#000000', background: '#ffffff' };
}

interface VolumetricProps {
  modelPath?: string;
  geometryNode?: React.ReactNode;
  color?: string;
  bgColor?: string;
}

function Object({ modelPath, geometryNode, color="#000000", bgColor="#ffffff" }: VolumetricProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const { scene } = modelPath ? useGLTF(modelPath) : { scene: null };

  useLayoutEffect(() => {
    if (scene) {
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;

          const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            wireframe: true,
          });

          const maskMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(bgColor), 
            polygonOffset: true,
            polygonOffsetFactor: 1, // Pushes the solid face back slightly
            polygonOffsetUnits: 1,
          });

          mesh.material = [maskMaterial, wireframeMaterial];

          mesh.geometry.addGroup(0, Infinity, 0); // Group for Mask
          mesh.geometry.addGroup(0, Infinity, 1); // Group for Wireframe
        }
      });
    }
  }, [scene, color]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Center>
      <group ref={groupRef}>
        {scene ? (
          <primitive object={scene} />
        ) : (
          <mesh>
            {geometryNode}
            <meshBasicMaterial color="#ffffff" /> {/* The "Solid" interior */}
            <meshBasicMaterial color={color} wireframe /> {/* The "Wireframe" exterior */}
          </mesh>
        )}
      </group>
    </Center>
  );
}

function VolumetricContainer(props: VolumetricProps) {
  const themeColors = useThemeColors();

  return (
    <div className={styles.base}>
      <Canvas gl={{ 
          antialias: true, 
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace 
        }}
        camera={{ position: [0, 0, 15], fov: 40 }}>
        <Suspense fallback={null}>
          <Object 
            {...props} 
            color={themeColors.wireframe} 
            bgColor={themeColors.background}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default VolumetricContainer;