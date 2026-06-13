import React, { useRef, useMemo, useLayoutEffect, useEffect, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useVolumetricTheme } from '../VolumetricContainer/VolumetricContainer';

const TankModel = memo(() => {
  const { wireframe: wireframeColor, background: bodyColor } = useVolumetricTheme();
  
  // Refs for animation
  const groupRef = useRef<THREE.Group>(null!);
  const turretRef = useRef<THREE.Object3D>(null!);
  const gunRef = useRef<THREE.Object3D>(null!);
  const sprocketWheelsRef = useRef<THREE.Object3D[]>([]);
  const driveWheelsRef = useRef<THREE.Object3D[]>([]);
  const rollerWheelsRef = useRef<THREE.Object3D[]>([]);
  const antennaBonesRef = useRef<THREE.Object3D[]>([]);

  // Asset Loading
  const { scene: tankScene } = useGLTF('models/tank.glb');

  // 1. Shared Track Geometry
  const trackGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.5, 0.5, 12, 4, 35);
    geo.rotateY(Math.PI / 4);
    return geo;
  }, []);

  // 2. Track Shader Settings (stable reference)
  const trackMaterialSettingsRef = useRef<any>(null);
  const solidTrackMaterialRef = useRef<THREE.ShaderMaterial>(null!);
  const wireframeTrackMaterialRef = useRef<THREE.ShaderMaterial>(null!);
  
  if (!trackMaterialSettingsRef.current) {
    const vertexShader = `
    uniform float uTime;
      uniform float uSpeed;
      uniform float uSuspension1Height;
      uniform float uSuspension2Height;
      uniform float uSuspension3Height;
      uniform float uSuspension4Height;
      uniform float uTensionOffset;
      varying float vT;

      vec3 getPathPoint(float t) {
        float arcRadiusScale = (1.0 + uSuspension1Height * -0.6);

        /* 1. Bottom Long Segments */
        float bottomLong1StartPosX = 2.6;
        float bottomLong1StartPosY = uSuspension1Height;
        float bottomLong1EndPosX = 4.2;
        float bottomLong1EndPosY = uSuspension2Height;
        float bottomLong1Length = length(vec2(bottomLong1EndPosX - bottomLong1StartPosX, bottomLong1EndPosY - bottomLong1StartPosY));

        float bottomLong2StartPosX = 4.2;
        float bottomLong2StartPosY = uSuspension2Height;
        float bottomLong2EndPosX = 5.6;
        float bottomLong2EndPosY = uSuspension3Height;
        float bottomLong2Length = length(vec2(bottomLong2EndPosX - bottomLong2StartPosX, bottomLong2EndPosY - bottomLong2StartPosY));

        float bottomLong3StartPosX = 5.6;
        float bottomLong3StartPosY = uSuspension3Height;
        float bottomLong3EndPosX = 7.15;
        float bottomLong3EndPosY = uSuspension4Height;
        float bottomLong3Length = bottomLong3EndPosX - bottomLong3StartPosX;

        /* 2. Front Bottom Arc */
        float frontBottomArcRadius = 1.0;
        float frontBottomArcCenterX = 7.15;
        float frontBottomArcCenterY = 1.0 + uSuspension4Height;
        float frontBottomArcLength = (53.1 * 0.01745) * frontBottomArcRadius;
        float frontBottomArcStartAngle = -90.0 * 0.01745;
        float frontBottomArcEndAngle = -36.9 * 0.01745;

        /* 3. Bottom Short Segment */
        float bottomShortStartPosX = 7.95;
        float bottomShortStartPosY = 0.4 + uSuspension4Height;
        float bottomShortEndPosX = 8.91;
        float bottomShortEndPosY = 1.6;
        float bottomShortLength = length(vec2(bottomShortEndPosX - bottomShortStartPosX, bottomShortEndPosY - bottomShortStartPosY));

        /* 4. Front Top Arc */
        float frontTopArcRadius = 1.0;
        float frontTopArcCenterX = 8.11;
        float frontTopArcCenterY = 2.2;
        float frontTopArcLength = (126.9 * 0.01745) * frontTopArcRadius;
        float frontTopStartAngle = -36.9 * 0.01745;
        float frontTopEndAngle = 90.0 * 0.01745;

        /* 5. Top Long Segment */
        float topLongStartPosX = 8.11;
        float topLongStartPosY = 3.2;
        float topLongEndPosX = 3.45;
        float topLongEndPosY = 3.13;
        float topLongLength = length(vec2(topLongEndPosX - topLongStartPosX, topLongEndPosY - topLongStartPosY));

        /* 6. Top Short Segment */
        float topShortStartPosX = 3.45;
        float topShortStartPosY = 3.13;
        float topShortEndPosX = 1.12 + uTensionOffset;
        float topShortEndPosY = 2.83;
        float topShortLength = length(vec2(topShortEndPosX - topShortStartPosX, topShortEndPosY - topShortStartPosY));

        /* 7. Rear Top Arc */
        float rearTopArcRadius = 1.0;
        float rearTopArcCenterX = 1.19 + uTensionOffset;
        float rearTopArcCenterY = 1.83;
        float rearTopArcLength = (123.4 * 0.01745) * rearTopArcRadius;
        float rearTopArcStartAngle = 94.0 * 0.01745;
        float rearTopArcEndAngle = 217.4 * 0.01745;

        /* 8. Rear Bottom Arc */
        float rearBottomArcRadius = 2.6;
        float rearBottomArcCenterX = 2.6 + uTensionOffset;
        float rearBottomArcCenterY = 2.6;
        float rearBottomArcLength = (58.0 * 0.01745) * rearBottomArcRadius * arcRadiusScale;
        float rearBottomArcStartAngle = -148.0 * 0.01745;
        float rearBottomArcEndAngle = -90.0 * 0.01745;

        float total = bottomLong1Length + bottomLong2Length + bottomLong3Length + frontBottomArcLength + bottomShortLength + frontTopArcLength + topLongLength + topShortLength + rearTopArcLength + rearBottomArcLength;
        float dist = mod(t * total, total);

        /* 1. Bottom Long Segment */
        if (dist < bottomLong1Length) {
          return vec3(0.0, mix(bottomLong1StartPosY, bottomLong1EndPosY, dist / bottomLong1Length), mix(bottomLong1StartPosX, bottomLong1EndPosX, dist / bottomLong1Length));
        }
        dist -= bottomLong1Length;

        if (dist < bottomLong2Length) {
          return vec3(0.0, mix(bottomLong2StartPosY, bottomLong2EndPosY, dist / bottomLong2Length), mix(bottomLong2StartPosX, bottomLong2EndPosX, dist / bottomLong2Length));
        }
        dist -= bottomLong2Length;

        if (dist < bottomLong3Length) {
          return vec3(0.0, mix(bottomLong3StartPosY, bottomLong3EndPosY, dist / bottomLong3Length), mix(bottomLong3StartPosX, bottomLong3EndPosX, dist / bottomLong3Length));
        }
        dist -= bottomLong3Length;

        /* 2. Front Bottom Arc */
        if (dist < frontBottomArcLength) {
          float a = mix(frontBottomArcStartAngle, frontBottomArcEndAngle, dist / frontBottomArcLength);
          return vec3(0.0, frontBottomArcCenterY + sin(a) * frontBottomArcRadius, frontBottomArcCenterX + cos(a) * frontBottomArcRadius); //0.0 is X, Y is centerY + sin(a) * radius, Z is centerZ + cos(a) * radius
        }
        dist -= frontBottomArcLength;

        /* 3. Bottom Short Segment */
        if (dist < bottomShortLength) {
          return vec3(0.0, mix(bottomShortStartPosY, bottomShortEndPosY, dist / bottomShortLength), mix(bottomShortStartPosX, bottomShortEndPosX, dist / bottomShortLength));
        }
        dist -= bottomShortLength;

        /* 4. Front Top Arc */
        if (dist < frontTopArcLength) {
          float a = mix(frontTopStartAngle, frontTopEndAngle, dist / frontTopArcLength);
          return vec3(0.0, frontTopArcCenterY + sin(a) * frontTopArcRadius, frontTopArcCenterX + cos(a) * frontTopArcRadius);
        }
        dist -= frontTopArcLength;

        /* 5. Top Long Segment */
        if (dist < topLongLength) {
          return vec3(0.0, mix(topLongStartPosY, topLongEndPosY, dist / topLongLength), mix(topLongStartPosX, topLongEndPosX, dist / topLongLength));
        }
        dist -= topLongLength;

        /* 6. Top Short Segment */
        if (dist < topShortLength) {
          return vec3(0.0, mix(topShortStartPosY, topShortEndPosY, dist / topShortLength), mix(topShortStartPosX, topShortEndPosX, dist / topShortLength));
        }
        dist -= topShortLength;

        /* 7. Rear Top Arc */
        if (dist < rearTopArcLength) {
          float a = mix(rearTopArcStartAngle, rearTopArcEndAngle, dist / rearTopArcLength);
          return vec3(0.0, rearTopArcCenterY + sin(a) * rearTopArcRadius, rearTopArcCenterX + cos(a) * rearTopArcRadius);
        }
        dist -= rearTopArcLength;

        /* 8. Rear Bottom Arc */
        float a = mix(rearBottomArcStartAngle, rearBottomArcEndAngle, dist / rearBottomArcLength);
        float yOffset = rearBottomArcCenterY - uSuspension1Height + sin(a) * (rearBottomArcRadius * arcRadiusScale); 
        float zOffset = rearBottomArcCenterX + cos(a) * rearBottomArcRadius;
        return vec3(0.0, yOffset, zOffset);
      }
      
      void main() {
        float trackWidth = 1.5;
        float trackThickness = 0.2;

        float eps = 0.001;

        float trackModelHeight = 12.0;
        float normalizedY = (position.y + (trackModelHeight * 0.5)) / trackModelHeight;
        float t = mod(normalizedY + uTime * uSpeed, 1.0);

        vec3 pathPos = getPathPoint(t);

        vec3 prevPos = getPathPoint(t - eps);
        vec3 nextPos = getPathPoint(t + eps);
        vec3 tangent = normalize(nextPos - prevPos);

        vT = t;

        vec3 side = vec3(1.0, 0.0, 0.0); 
        vec3 normal = normalize(cross(tangent, side));
        vec3 binormal = cross(normal, tangent);

        vec3 finalPos = pathPos + (normal * position.x * trackThickness) + (binormal * position.z * trackWidth);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
      }`;
    const fragmentShader = `
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4(uColor, 1.0);
        #include <colorspace_fragment>
      }
    `;
    
    trackMaterialSettingsRef.current = {
      baseUniforms: {
        uTime: { value: 0.0 },
        uSpeed: { value: 0.25 },
        uSuspension1Height: { value: 0.0 },
        uSuspension2Height: { value: 0.0 },
        uSuspension3Height: { value: 0.0 },
        uSuspension4Height: { value: 0.0 },
        uTensionOffset: { value: 0.0 }
      },
      solidUniforms: {
        uColor: { value: new THREE.Color(bodyColor) }
      },
      wireframeUniforms: {
        uColor: { value: new THREE.Color(wireframeColor) }
      },
      vertexShader,
      fragmentShader
    };
  }

  const trackMaterialSettings = trackMaterialSettingsRef.current;

  // Initialize and update colors
  useEffect(() => {
    if (trackMaterialSettings.solidUniforms) {
      trackMaterialSettings.solidUniforms.uColor.value.copy(bodyColor);
    }
  }, [bodyColor]);

  useEffect(() => {
    if (trackMaterialSettings.wireframeUniforms) {
      trackMaterialSettings.wireframeUniforms.uColor.value.copy(wireframeColor);
    }
  }, [wireframeColor]);

  // 3. Materials for the Tank Body
  const materials = useMemo(() => {
    const mask = new THREE.MeshBasicMaterial({ color: bodyColor, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
    const wire = new THREE.MeshBasicMaterial({ color: wireframeColor, wireframe: true });
    return { mask, wire };
  }, [wireframeColor, bodyColor]);

  // 4. Initialization & Traversal
  useLayoutEffect(() => {
    const sprockets: THREE.Object3D[] = [];
    const drive: THREE.Object3D[] = [];
    const rollers: THREE.Object3D[] = [];
    const antenna: THREE.Object3D[] = [];

    tankScene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material = [materials.mask, materials.wire];
        if (obj.geometry.groups.length === 0) {
          obj.geometry.addGroup(0, Infinity, 0);
          obj.geometry.addGroup(0, Infinity, 1);
        }
        if (obj.name.toLowerCase().includes('wheelm')) sprockets.push(obj);
        else if (obj.name.toLowerCase().includes('wheelb')) drive.push(obj);
        else if (obj.name.toLowerCase().includes('wheelt')) rollers.push(obj);
        else if (obj.name === 'Turret') turretRef.current = obj;
        else if (obj.name === 'Gun') gunRef.current = obj;
      }
      if (obj.name.toLowerCase().includes('antennabone')) antenna.push(obj);
    });

    sprocketWheelsRef.current = sprockets;
    driveWheelsRef.current = drive.sort((a, b) => a.position.z - b.position.z);
    rollerWheelsRef.current = rollers;
    antennaBonesRef.current = antenna;
  }, [tankScene, materials]);

  // --- ANIMATION HELPERS ---
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
  const targetPoint = new THREE.Vector3();

  useFrame((state, delta) => {
    const speed = Math.abs(trackMaterialSettings.baseUniforms.uSpeed.value);
    const time = state.clock.getElapsedTime();

    // 1. Tank "Bobbing" & Movement
    if (groupRef.current) {
      const bobFreq = 20.0; 
      const bobAmp = 0.007;
      groupRef.current.position.y = Math.sin(time * bobFreq) * bobAmp * (speed + 0.5); 

      const pitchFreq = 5.0;
      const pitchAmp = 0.01;
      groupRef.current.rotation.x = Math.cos(time * pitchFreq) * pitchAmp * (speed + 0.2);

      const waddleFreq = 3.0;
      const waddleAmp = 0.01;
      groupRef.current.rotation.z = Math.sin(time * waddleFreq) * waddleAmp * speed;

      const tankRotationSpeed = 0.5;
      groupRef.current.rotation.y = Math.sin(time * tankRotationSpeed) * (25 * Math.PI / 360) + (65 * Math.PI / 360);
    }

    // 2. Suspension Logic
    let tensionSum = 0;
    for (let i = 1; i <= 4; i++) {
        const key = `uSuspension${i}Height` as keyof typeof trackMaterialSettings.baseUniforms;
        const wave = (Math.sin(time * 5.0 + i * 1.5) * 0.15 + 
                      Math.sin(time * 8.0 + i * 2.5) * 0.2 + 
                      Math.cos(time * 8.0 + i * 0.5) * 0.01) * speed;
        const currentValue = (trackMaterialSettings.baseUniforms[key] as any).value;
        const newValue = THREE.MathUtils.lerp(currentValue, -wave, 0.5);
        (trackMaterialSettings.baseUniforms[key] as any).value = newValue;
        tensionSum += ((i === 1) ? newValue * 0.5 : newValue);
    }
    trackMaterialSettings.baseUniforms.uTensionOffset.value = tensionSum;

    // 3. Wheel Rotations & Placement
    driveWheelsRef.current.forEach((wheel, i) => {
      wheel.rotation.x += delta * speed * 20.0;
      const suspKey = `uSuspension${Math.floor(i / 2) + 1}Height` as keyof typeof trackMaterialSettings.baseUniforms;
      const wheelBaseY = 0.6;
      wheel.position.y = wheelBaseY + (trackMaterialSettings.baseUniforms[suspKey] as any).value;
    });
    sprocketWheelsRef.current.forEach((wheel) => {
      wheel.rotation.x += delta * speed * 10.0;
      if (wheel.position.z < 3.0) {
        const wheelBaseZ = -3.15;
        wheel.position.z = wheelBaseZ + trackMaterialSettings.baseUniforms.uTensionOffset.value;
      }
    });
    rollerWheelsRef.current.forEach((wheel) => {
      wheel.rotation.x += delta * speed * 20.0;
    });

    // 4. Tracks
    trackMaterialSettings.baseUniforms.uTime.value -= delta * 0.5;

    // 5. Antenna Wind/Lean
    if (antennaBonesRef.current.length && turretRef.current) {
      const time = state.clock.getElapsedTime();

      const turretAngle = turretRef.current.rotation.y;

      const wobbleSpeed = 30.0;
      const wobbleAmplitude = 0.01;
      const leanIntensity = 0.2; 
      const sideLeanIntensityFactor = 0.3;

      antennaBonesRef.current.forEach((part, index) => {
        const boneFactor = (index + 1) * 0.5;
        
        const windForce = speed * leanIntensity * boneFactor;

        const leanX = -Math.cos(turretAngle) * windForce;
        const leanZ = Math.sin(turretAngle) * windForce;

        const phase = index * 0.7;
        const vibrationX = Math.sin(time * wobbleSpeed + phase) * wobbleAmplitude;
        const vibrationZ = Math.cos(time * wobbleSpeed * sideLeanIntensityFactor + phase) * wobbleAmplitude;

        part.rotation.x = leanX + vibrationX;
        part.rotation.z = -leanZ + vibrationZ;
      });
    }

    // 6. Turret & Gun Aiming
    state.raycaster.setFromCamera(state.pointer, state.camera);
    if (state.raycaster.ray.intersectPlane(plane, targetPoint) && turretRef.current) {
      const localTarget = targetPoint.clone();
      turretRef.current.parent?.worldToLocal(localTarget);
      const targetAngle = Math.atan2(
        localTarget.x - turretRef.current.position.x,
        localTarget.z - turretRef.current.position.z
      );
      const currentAngle = turretRef.current.rotation.y;
      let angleDiff = targetAngle - currentAngle;
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

      const rotationSpeed = 0.05;
      turretRef.current.rotation.y += angleDiff * rotationSpeed;

      const localGunTarget = targetPoint.clone();
      gunRef.current.parent?.worldToLocal(localGunTarget);

      const dx = localGunTarget.x - gunRef.current.position.x;
      const dz = localGunTarget.z - gunRef.current.position.z;
      const horizontalDist = Math.sqrt(dx * dx + dz * dz);
      const verticalDist = localGunTarget.y - gunRef.current.position.y;

      const targetGunAngle = -(Math.atan2(verticalDist, horizontalDist) - Math.PI / 2);
      const clampedTarget = THREE.MathUtils.clamp(targetGunAngle, 1.0, 1.7);
      
      let gunDiff = clampedTarget - gunRef.current.rotation.x;
      gunDiff = Math.atan2(Math.sin(gunDiff), Math.cos(gunDiff));
      
      gunRef.current.rotation.x += gunDiff * rotationSpeed;
    }
  });

  const DebugCircle = ({ center, radius, color = "cyan", circleRef }: { 
    center: [number, number, number], 
    radius: number, 
    color?: string,
    circleRef?: React.RefObject<THREE.LineLoop>
  }) => {
    const points = useMemo(() => {
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(0, center[1] + Math.sin(angle) * radius, center[2] + Math.cos(angle) * radius));
      }
      return pts;
    }, [center, radius]);

    const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

    return (
      <lineLoop ref={circleRef} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineLoop>
    );
  };

  const DebugLine = ({ start, end, color = "magenta", lineRef }: { 
    start: [number, number], 
    end: [number, number], 
    color?: string,
    lineRef?: React.RefObject<THREE.LineSegments>
    }) => {
    const points = useMemo(() => [
      new THREE.Vector3(0, start[1], start[0]),
      new THREE.Vector3(0, end[1], end[0])
    ], [start, end]);

    const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

    return (
      <lineSegments ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color={color} />
      </lineSegments>
    );
  };

  const TrackDebugOverlay = ({ position }: { position: [number, number, number]}) => {
    const seg1Ref = useRef<THREE.LineSegments>(null!);
    const seg2Ref = useRef<THREE.LineSegments>(null!);
    const seg3Ref = useRef<THREE.LineSegments>(null!);

    const circle1Ref = useRef<THREE.LineLoop>(null!);
    const circle2Ref = useRef<THREE.LineLoop>(null!);

    const segBtmShortRef = useRef<THREE.LineSegments>(null!);
    const segTopShortRef = useRef<THREE.LineSegments>(null!);
    const arcTensionRef = useRef<THREE.LineLoop>(null!);

    useFrame(() => {
      const s1H = trackMaterialSettings.baseUniforms.uSuspension1Height.value;
      const s2H = trackMaterialSettings.baseUniforms.uSuspension2Height.value;
      const s3H = trackMaterialSettings.baseUniforms.uSuspension3Height.value;
      const s4H = trackMaterialSettings.baseUniforms.uSuspension4Height.value;
      const tO = trackMaterialSettings.baseUniforms.uTensionOffset.value;

      if (seg1Ref.current) {
        const pos = seg1Ref.current.geometry.attributes.position.array as Float32Array;
        pos[1] = s1H;
        pos[4] = s2H;
        seg1Ref.current.geometry.attributes.position.needsUpdate = true;
      }

      if (seg2Ref.current) {
        const pos = seg2Ref.current.geometry.attributes.position.array as Float32Array;
        pos[1] = s2H;
        pos[4] = s3H;
        seg2Ref.current.geometry.attributes.position.needsUpdate = true;
      }

      if (seg3Ref.current) {
        const pos = seg3Ref.current.geometry.attributes.position.array as Float32Array;
        pos[1] = s3H;
        pos[4] = s4H;
        seg3Ref.current.geometry.attributes.position.needsUpdate = true;
      }

      if(circle1Ref.current) {
        circle1Ref.current.position.y = s4H;
      }

      if(circle2Ref.current) {
        circle2Ref.current.position.y = s1H;
        circle2Ref.current.position.z = tO;
        circle2Ref.current.scale.y = 1.0 + (s1H * -0.7);
      }

      if(segBtmShortRef.current) {
        const pos = segBtmShortRef.current.geometry.attributes.position.array as Float32Array;
        pos[1] = s4H + 0.4;
        segBtmShortRef.current.geometry.attributes.position.needsUpdate = true;
      }

      if(segTopShortRef.current) {
        const pos = segTopShortRef.current.geometry.attributes.position.array as Float32Array;
        pos[3] = tO;
        segTopShortRef.current.geometry.attributes.position.needsUpdate = true;
      }

      if(arcTensionRef.current) {
        arcTensionRef.current.position.z = tO;
      }
    });

    return (
      <group name="TrackDebugger" position={position}>
        {/* 1. Bottom Long Segment */}
        <DebugLine 
          lineRef={seg1Ref}
          start={[2.6, 0]} 
          end={[4.2, 0]} 
          color="lime" 
        />
        <DebugLine 
          lineRef={seg2Ref}
          start={[4.2, 0]} 
          end={[5.6, 0]} 
          color="cyan" 
        />
          <DebugLine 
          lineRef={seg3Ref}
          start={[5.6, 0]} 
          end={[7.15, 0]} 
          color="red" 
        />

        {/* 2. Front Bottom Arc */}
        <DebugCircle 
          circleRef={circle1Ref}
          center={[0, 1, 7.15]} 
          radius={1} 
          color="lime" 
        />

        {/* 3. Bottom Short Segment */}
        <DebugLine 
          lineRef={segBtmShortRef}
          start={[7.95, 0.4]} 
          end={[8.91, 1.6]} 
          color="blue" 
        />

        {/* 4. Front Top Arc */}
        <DebugCircle 
          center={[0, 2.2, 8.11]} 
          radius={1.0} 
          color="red" 
        />

        {/* 5. Top Long Segment */}
        <DebugLine 
          start={[8.11, 3.2]} 
          end={[3.45, 3.13]} 
          color="orange" 
        />

        {/* 6. Top Short Segment */}
        <DebugLine 
          lineRef={segTopShortRef}
          start={[3.45, 3.13]} 
          end={[1.12, 2.83]} 
          color="blue" 
        />
        
        {/* 7. Rear Top Arc */}
        <DebugCircle 
          circleRef={arcTensionRef}
          center={[0, 1.83, 1.19]} 
          radius={1} 
          color="red" 
        />

        {/* 8. Rear Bottom Arc */}
        <DebugCircle 
          circleRef={circle2Ref}
          center={[0, 2.6, 2.6]} 
          radius={2.6} 
          color="red" 
        />
      </group>
    );
  };

  function renderTrack() {
    return(
      <>
        {/* SOLID BODY */}
        <mesh geometry={trackGeometry}>
          <shaderMaterial 
            ref={solidTrackMaterialRef}
            vertexShader={trackMaterialSettings.vertexShader}
            fragmentShader={trackMaterialSettings.fragmentShader}
            uniforms={{
              ...trackMaterialSettings.baseUniforms,
              ...trackMaterialSettings.solidUniforms
            }}
            polygonOffset={true}
            polygonOffsetFactor={1}
            polygonOffsetUnits={1}
          />
        </mesh>
        {/* WIREFRAME */}
        <mesh geometry={trackGeometry}>
          <shaderMaterial 
            ref={wireframeTrackMaterialRef}
            vertexShader={trackMaterialSettings.vertexShader}
            fragmentShader={trackMaterialSettings.fragmentShader}
            uniforms={{
              ...trackMaterialSettings.baseUniforms,
              ...trackMaterialSettings.wireframeUniforms
            }}
            wireframe={true}
          />
        </mesh>
      </>
    );
  }

  const TRACK_SEPARATION = 2.8;
  const displayDebug = false;
  return (
    <group ref={groupRef}>
      {displayDebug && <TrackDebugOverlay position={[-TRACK_SEPARATION - 1.0, 0.1, -4.3]} />}
      {displayDebug && <axesHelper args={[10]} />}

      <primitive object={tankScene} />

      {/* Left Track */}
      <group position={[-TRACK_SEPARATION, 0.1, -4.3]}>
        {renderTrack()}
      </group>
      {/* Right Track */}
      <group position={[TRACK_SEPARATION, 0.1, -4.3]}>
        {renderTrack()}
      </group>
    </group>
  );
});

export default TankModel;