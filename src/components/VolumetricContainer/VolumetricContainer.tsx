import React, { useState, useEffect, createContext, useContext, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import * as THREE from 'three';
import styles from './VolumetricContainer.module.scss';

/*** --- THEME CONTEXT --- ***/
interface ThemeColors {
  wireframe: THREE.Color;
  background: THREE.Color;
}

const ThemeContext = createContext<ThemeColors | null>(null);

export const useVolumetricTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useVolumetricTheme must be used within VolumetricContainer");
  return context;
};

/*** --- HOOK: useThemeColors --- ***/
function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>({
    wireframe: new THREE.Color('#000000'),
    background: new THREE.Color('#ffffff'),
  });

  useEffect(() => {
    const updateColors = () => {
      const root = getComputedStyle(document.documentElement);
      const bgRaw = root.getPropertyValue('--3d-body-color').trim() || '#ffffff';
      const wireframeRaw = root.getPropertyValue('--3d-wireframe-color').trim() || '#000000';

      setColors({
        wireframe: new THREE.Color(wireframeRaw),
        background: new THREE.Color(bgRaw)
      });
    };

    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  return colors;
}

/*** --- COMPONENT: VolumetricContainer --- ***/
interface VolumetricContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function VolumetricContainer({ children, className }: VolumetricContainerProps) {
  const themeColors = useThemeColors();

  return (
    <div className={`${className || ''} ${styles.volumetricContainer}`}>
      <Canvas 
        gl={{ 
          antialias: true, 
          toneMapping: THREE.NoToneMapping, 
          outputColorSpace: THREE.SRGBColorSpace 
        }}
        camera={{ position: [0, 3, 23], fov: 20 }}
        onCreated={({ camera }) => camera.lookAt(0, 3, 0)}
      >
        <ThemeContext.Provider value={themeColors}>
          <Suspense fallback={null}>
            <Center>
              {children}
            </Center>
          </Suspense>
        </ThemeContext.Provider>
      </Canvas>
    </div>
  );
}