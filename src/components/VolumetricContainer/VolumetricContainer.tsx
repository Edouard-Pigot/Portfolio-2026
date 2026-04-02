import styles from './VolumetricContainer.module.scss';

import React, { useState, useEffect, useRef, useLayoutEffect, Suspense, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

/*** --- TYPES & INTERFACES --- ***/

// The two main colors used to render the object
interface ThemeState {
  wireframe: THREE.Color;
  background: THREE.Color;
}

// What define a VolumetricContainer : a modelPath to import an object or a geometryNode to use a THREEJS object + optional wireframe and body colors
interface VolumetricProps extends React.HTMLAttributes<HTMLDivElement> {
  modelPath?: string;
  geometryNode?: React.ReactNode;
  wireframeColor?: THREE.Color;
  bodyColor?: THREE.Color;
}

/**
 * CUSTOM HOOK: useThemeColors
 * This hook acts as a bridge between the CSS variables and React.
 * It watches for theme changes on the <html> element and updates the 3D scene.
 */
function useThemeColors(): ThemeState {
  const [colors, setColors] = useState<ThemeState>({
    wireframe: new THREE.Color('#000000'),
    background: new THREE.Color('#ffffff'),
  });

  useEffect(() => {
    // Function to grab the latest CSS Variable values from the DOM root
    const updateColors = () => {
      const root = getComputedStyle(document.documentElement);
      
      // Get Background Color
      const bgRaw = root.getPropertyValue('--3d-body-color').trim() || '#ffffff';
      const bgColor = new THREE.Color(bgRaw);

      // Get Decorator HSLA string
      const wireframeRaw = root.getPropertyValue('--3d-wireframe-color').trim() || '#000000';
      const wireframeColor = new THREE.Color(wireframeRaw);

      setColors({
        wireframe: wireframeColor,
        background: bgColor
      });
    };

    // Initial run on mount
    updateColors();
    
    // Watch for theme changes: when 'data-theme' changes on <html>, if so grab the new colors and update the state
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  return colors;
}

/**
 * COMPONENT: SceneObject
 * This handles the 3D logic. Uses 'memo' so it doesn't re-calculate
 * the heavy 3D traversal unless the colors or model actually change.
 */
const SceneObject = memo(({ modelPath, geometryNode, wireframeColor, bodyColor }: VolumetricProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Load the 3D model (GLTF/GLB) if a path is provided
  const { scene } = modelPath ? useGLTF(modelPath) : { scene: null };

  /**
   * MEMOIZED MATERIALS
   * Create the materials here so they are shared across all meshes in the model.
   * In theory the bodyColor should not be transparent, but who knows ?
   */
  const materials = useMemo(() => {
    // The "Interior" mask: hides wireframes behind it to create a "solid" feel
    const maskMaterial = new THREE.MeshBasicMaterial({
      color: bodyColor,
      polygonOffset: true,  // Prevents "Z-fighting" (flickering) between mask and wireframe
      polygonOffsetFactor: 1, // Pushes the solid face back slightly
      polygonOffsetUnits: 1
    });

    // The "Exterior" wireframe: the visible blueprint-style lines
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: wireframeColor,
      wireframe: true
    });

    return { wireframeMaterial, maskMaterial };
  }, [wireframeColor, bodyColor]);

  /**
   * SCENE TRAVERSAL
   * When a model is loaded, walk through every mesh and apply the two materials (Mask + Wireframe).
   */
  useLayoutEffect(() => {
    if (scene) {
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;

          mesh.material = [materials.maskMaterial, materials.wireframeMaterial];

          // Define "Groups" in the geometry so Three.js knows which 
          // material to use for which part of the render call.
          if (mesh.geometry.groups.length === 0) {
            mesh.geometry.addGroup(0, Infinity, 0); // Group for Mask
            mesh.geometry.addGroup(0, Infinity, 1); // Group for Wireframe
          }
        }
      });
    }

    // Cleanup GPU resources on unmount or theme change
    return () => {
      materials.wireframeMaterial.dispose();
      materials.maskMaterial.dispose();
    };
  }, [scene, materials]);

  // Constant rotation animation (0.1 radians per second)
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <Center>
      <group ref={groupRef}>
        {scene ? (
          // If a 3D model was loaded, render it
          <primitive object={scene} />
        ) : (
          /* If a Geometry Node was loaded
             We render the geometry twice: once as a solid mask, 
             and once as the wireframe on top. 
          */
          <group>
            {/* The Solid Mask Layer */}
            <mesh>
              {geometryNode}
              <primitive object={materials.maskMaterial} attach="material" />
            </mesh>
            
            {/* The Wireframe Layer */}
            <mesh>
              {geometryNode}
              <primitive object={materials.wireframeMaterial} attach="material" />
            </mesh>
          </group>
        )}
      </group>
    </Center>
  );
});

/**
 * MAIN COMPONENT: VolumetricContainer
 * The parent component that sets up the Canvas and provides the theme data.
 */
function VolumetricContainer({ className, modelPath, geometryNode }: VolumetricProps) {
  const themeColors = useThemeColors();

  return (
    <div className={`${className || ''} ${styles.volumetricContainer}`}>
      {/* Canvas: The entry point for React Three Fiber.
          gl settings ensure colors look correct (sRGB) and high-quality (antialias).
      */}
      <Canvas gl={{ 
          antialias: true, 
          toneMapping: THREE.NoToneMapping, // Disables HDR mapping for pure CSS-matched colors
          outputColorSpace: THREE.SRGBColorSpace 
        }}
        camera={{ position: [0, 0, 20], fov: 20 }}
      >
        {/* Suspense handles the loading state of the GLTF model */}
        <Suspense fallback={null}>
          <SceneObject 
            modelPath={modelPath}
            geometryNode={geometryNode}
            wireframeColor={themeColors.wireframe} 
            bodyColor={themeColors.background}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default VolumetricContainer;