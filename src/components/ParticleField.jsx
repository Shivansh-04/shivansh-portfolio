import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Ink Particles Component (inside Canvas) ──
function InkParticles({ count = 180, mouse }) {
  const meshRef = useRef();
  const { viewport } = useThree();

  // Generate initial particle positions + properties
  const [positions, velocities, sizes, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const opa = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across viewport with depth
      pos[i * 3] = (Math.random() - 0.5) * 20;      // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;  // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;   // z (depth)

      // Slow drifting velocity (Brownian-like)
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

      // Random sizes (ink dots — varied)
      siz[i] = Math.random() * 3 + 1;

      // Random opacity
      opa[i] = Math.random() * 0.4 + 0.1;
    }

    return [pos, vel, siz, opa];
  }, [count]);

  // Create circular dot texture
  const dotTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    // Soft circle with feathered edge
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(13, 13, 15, 1)");
    gradient.addColorStop(0.4, "rgba(13, 13, 15, 0.8)");
    gradient.addColorStop(0.7, "rgba(13, 13, 15, 0.3)");
    gradient.addColorStop(1, "rgba(13, 13, 15, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const posAttr = meshRef.current.geometry.attributes.position;
    const posArray = posAttr.array;

    // Mouse influence
    const mx = mouse.current[0] * viewport.width * 0.5;
    const my = mouse.current[1] * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Apply drift velocity
      posArray[i3] += velocities[i3] + Math.sin(state.clock.elapsedTime * 0.3 + i * 0.1) * 0.002;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(state.clock.elapsedTime * 0.2 + i * 0.15) * 0.002;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Subtle mouse repulsion
      const dx = posArray[i3] - mx;
      const dy = posArray[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.003;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }

      // Wrap around boundaries
      if (posArray[i3] > 12) posArray[i3] = -12;
      if (posArray[i3] < -12) posArray[i3] = 12;
      if (posArray[i3 + 1] > 9) posArray[i3 + 1] = -9;
      if (posArray[i3 + 1] < -9) posArray[i3 + 1] = 9;
      if (posArray[i3 + 2] > 5) posArray[i3 + 2] = -5;
      if (posArray[i3 + 2] < -5) posArray[i3 + 2] = 5;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          count={count}
          array={opacities}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        map={dotTexture}
        size={0.08}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.35}
        depthWrite={false}
        blending={THREE.NormalBlending}
        color="#0d0d0f"
      />
    </points>
  );
}

// ── Floating Ink Lines (subtle connecting lines) ──
function InkLines({ count = 12 }) {
  const linesRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = [];
    const spd = [];

    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 18;
      const y1 = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 4 - 2;
      const angle = Math.random() * Math.PI * 2;
      const len = Math.random() * 2 + 0.5;

      pos.push(x1, y1, z);
      pos.push(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len, z);

      spd.push(Math.random() * 0.003 + 0.001);
    }

    return [new Float32Array(pos), spd];
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const posArr = linesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const offset = Math.sin(state.clock.elapsedTime * speeds[i] * 100 + i) * 0.01;
      posArr[i * 6 + 1] += offset;     // y1
      posArr[i * 6 + 4] += offset;     // y2
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#0d0d0f"
        transparent
        opacity={0.06}
        linewidth={1}
      />
    </lineSegments>
  );
}

// ── Main Exported Component ──
export default function ParticleField() {
  const mouse = useRef([0, 0]);

  const handleMouseMove = useCallback((e) => {
    // Normalize to -1...1
    mouse.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current[1] = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-auto"
      onMouseMove={handleMouseMove}
      style={{ opacity: 0.7 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <InkParticles count={180} mouse={mouse} />
        <InkLines count={12} />
      </Canvas>
    </div>
  );
}
