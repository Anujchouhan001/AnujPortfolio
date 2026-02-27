import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment, MeshReflectorMaterial } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

/* ============================================================
   CAMERA RIG — Smooth cinematic camera on S-curve path
   ============================================================ */
function CameraRig({ gameState, currentSection }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 3, 0));
  const target = useRef(new THREE.Vector3(0, 60, 100));
  const look = useRef(new THREE.Vector3(0, 5, 0));
  const time = useRef(0);

  useEffect(() => {
    if (gameState === 'start') {
      target.current.set(0, 50, 95);
      look.current.set(0, 8, 0);
    } else if (gameState === 'entering') {
      target.current.set(0, 15, 78);
      look.current.set(0, 4, 50);
    } else if (gameState === 'journey') {
      const waypoints = [
        { p: [5, 3.5, 58], l: [-4, 3, 35] },
        { p: [-4, 3.5, 42], l: [5, 3, 20] },
        { p: [5, 3.5, 25], l: [-4, 3, 2] },
        { p: [-4, 3.5, 8], l: [5, 3, -15] },
        { p: [5, 3.5, -10], l: [-4, 3, -33] },
        { p: [-4, 3.5, -28], l: [5, 3, -50] },
        { p: [0, 4, -45], l: [0, 3, -70] },
      ];
      const i = Math.min(Math.max(currentSection, 0), waypoints.length - 1);
      target.current.set(...waypoints[i].p);
      look.current.set(...waypoints[i].l);
    } else if (gameState === 'complete') {
      target.current.set(0, 40, -60);
      look.current.set(0, 8, -40);
    }
  }, [gameState, currentSection]);

  useFrame((state, delta) => {
    time.current += delta;
    // Smoother interpolation with ease-out feel
    const lerpSpeed = 0.018 + Math.abs(camera.position.distanceTo(target.current)) * 0.0002;
    camera.position.lerp(target.current, lerpSpeed);
    lookAt.current.lerp(look.current, lerpSpeed * 1.1);

    // Cinematic breathing — subtle and natural
    const t = time.current;
    camera.position.x += Math.sin(t * 0.2) * 0.008;
    camera.position.y += Math.sin(t * 0.35) * 0.006;
    camera.position.z += Math.cos(t * 0.12) * 0.004;

    camera.lookAt(lookAt.current);
  });

  return null;
}

/* ============================================================
   BUILDINGS — Realistic with lit windows, varied shapes
   ============================================================ */
function Building({ position, width, height, depth, color, windowColor }) {
  const windowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Dark building face
    ctx.fillStyle = '#080812';
    ctx.fillRect(0, 0, 64, 128);

    // Draw window grid
    const cols = 4;
    const rows = 10;
    const ww = 8;
    const wh = 6;
    const gapX = (64 - cols * ww) / (cols + 1);
    const gapY = (128 - rows * wh) / (rows + 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lit = Math.random() > 0.35;
        if (lit) {
          const warm = Math.random() > 0.5;
          ctx.fillStyle = warm
            ? `rgba(${200 + Math.random() * 55}, ${180 + Math.random() * 40}, ${80 + Math.random() * 60}, ${0.6 + Math.random() * 0.4})`
            : `rgba(${100 + Math.random() * 80}, ${120 + Math.random() * 80}, ${200 + Math.random() * 55}, ${0.5 + Math.random() * 0.5})`;
        } else {
          ctx.fillStyle = `rgba(15, 15, 30, ${0.7 + Math.random() * 0.3})`;
        }
        const x = gapX + c * (ww + gapX);
        const y = gapY + r * (wh + gapY);
        ctx.fillRect(x, y, ww, wh);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(Math.ceil(width / 5), Math.ceil(height / 8));
    return tex;
  }, [width, height]);

  return (
    <group position={position}>
      {/* Main body */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          map={windowTexture}
          emissive={color}
          emissiveIntensity={0.04}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Rooftop accent light */}
      <mesh position={[0, height + 0.1, 0]}>
        <boxGeometry args={[width * 0.9, 0.2, depth * 0.9]} />
        <meshStandardMaterial
          color="#111"
          emissive={color}
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Rooftop antenna (tall buildings) */}
      {height > 20 && (
        <mesh position={[0, height + 3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 6, 4]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      )}
      {/* Rooftop blinking light */}
      {height > 18 && (
        <pointLight
          position={[0, height + 6.2, 0]}
          color="#ff3333"
          intensity={2}
          distance={8}
        />
      )}
    </group>
  );
}

function CityBuildings() {
  const buildings = useMemo(() => {
    const arr = [];
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#a855f7', '#3b82f6', '#f97316'];

    // Dense buildings on both sides
    for (let i = 0; i < 130; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const distFromRoad = 10 + Math.random() * 55;
      const height = 6 + Math.random() * 35;
      const w = 4 + Math.random() * 10;
      const d = 4 + Math.random() * 10;
      arr.push({
        pos: [side * distFromRoad + (Math.random() - 0.5) * 5, 0, -130 + Math.random() * 260],
        w, h: height, d,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <Building
          key={i}
          position={b.pos}
          width={b.w}
          height={b.h}
          depth={b.d}
          color={b.color}
        />
      ))}
    </group>
  );
}

/* ============================================================
   REFLECTIVE WET GROUND — Mirror-like road surface
   ============================================================ */
function ReflectiveGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[300, 400]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050510"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  );
}

/* ============================================================
   ROAD — Detailed with lanes, sidewalks, markings
   ============================================================ */
function Road() {
  return (
    <group>
      {/* Main road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[14, 400]} />
        <meshStandardMaterial
          color="#0c0c18"
          emissive="#6366f1"
          emissiveIntensity={0.008}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Sidewalks */}
      {[-8.5, 8.5].map(x => (
        <mesh key={x} position={[x, 0.15, 0]}>
          <boxGeometry args={[3, 0.3, 400]} />
          <meshStandardMaterial color="#0e0e1e" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Road edge neon strips */}
      {[-7, 7].map(x => (
        <mesh key={`neon-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 0]}>
          <planeGeometry args={[0.12, 400]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Center dashed lines */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -200 + i * 8]}>
          <planeGeometry args={[0.12, 3]} />
          <meshBasicMaterial color="#2a2a5e" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Lane dividers */}
      {[-3.5, 3.5].map(x => (
        <mesh key={`lane-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.025, 0]}>
          <planeGeometry args={[0.06, 400]} />
          <meshBasicMaterial color="#1a1a3e" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
   NEON SIGNS — Floating holographic signs on buildings
   ============================================================ */
function NeonSigns() {
  const signs = useMemo(() => {
    const items = [];
    const texts = ['CYBER', 'NEON', 'DATA', 'CODE', 'DEV', 'TECH', 'AI', 'WEB'];
    const colors = ['#ec4899', '#06b6d4', '#a855f7', '#10b981', '#f97316', '#6366f1'];
    for (let i = 0; i < 20; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      items.push({
        pos: [side * (9 + Math.random() * 8), 5 + Math.random() * 15, -100 + Math.random() * 200],
        color: colors[Math.floor(Math.random() * colors.length)],
        text: texts[Math.floor(Math.random() * texts.length)],
        size: 1.5 + Math.random() * 2.5,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {signs.map((s, i) => (
        <group key={i} position={s.pos}>
          {/* Glow panel */}
          <mesh>
            <planeGeometry args={[s.size * 2, s.size * 0.8]} />
            <meshBasicMaterial color={s.color} transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
          {/* Neon light emission */}
          <pointLight color={s.color} intensity={4} distance={12} />
        </group>
      ))}
    </group>
  );
}

/* ============================================================
   STREET LIGHTS — Realistic lamp posts
   ============================================================ */
function StreetLights() {
  const lights = useMemo(() => {
    const arr = [];
    const colors = ['#6366f1', '#06b6d4', '#a855f7', '#ec4899', '#10b981'];
    for (let z = -120; z <= 120; z += 18) {
      arr.push({ pos: [8, 6, z], c: colors[Math.floor(Math.random() * colors.length)] });
      arr.push({ pos: [-8, 6, z], c: colors[Math.floor(Math.random() * colors.length)] });
    }
    return arr;
  }, []);

  return (
    <group>
      {lights.map((l, i) => (
        <group key={i}>
          {/* Pole */}
          <mesh position={[l.pos[0], 3, l.pos[2]]}>
            <cylinderGeometry args={[0.05, 0.08, 6, 6]} />
            <meshStandardMaterial color="#111128" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Arm */}
          <mesh position={[l.pos[0] + (l.pos[0] > 0 ? -1 : 1), 5.8, l.pos[2]]} rotation={[0, 0, l.pos[0] > 0 ? 0.3 : -0.3]}>
            <cylinderGeometry args={[0.03, 0.03, 2.2, 4]} />
            <meshStandardMaterial color="#111128" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Lamp */}
          <mesh position={l.pos}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshBasicMaterial color={l.c} />
          </mesh>
          {/* Cone of light */}
          <pointLight
            position={l.pos}
            intensity={6}
            distance={20}
            color={l.c}
          />
          {/* Ground glow */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[l.pos[0], 0.04, l.pos[2]]}>
            <circleGeometry args={[2, 16]} />
            <meshBasicMaterial color={l.c} transparent opacity={0.06} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ============================================================
   ANIMATED CARS — Traffic moving along the road
   ============================================================ */
function Car({ startZ, speed, lane, color }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.z += speed * delta;
      if (ref.current.position.z > 130) ref.current.position.z = -130;
      if (ref.current.position.z < -130) ref.current.position.z = 130;
    }
  });

  return (
    <group ref={ref} position={[lane, 0.4, startZ]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[1.5, 0.6, 3.5]} />
        <meshStandardMaterial color="#0a0a1a" emissive={color} emissiveIntensity={0.08} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.5, -0.2]}>
        <boxGeometry args={[1.3, 0.5, 1.8]} />
        <meshStandardMaterial color="#050515" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
      </mesh>
      {/* Headlights */}
      <pointLight position={[0, 0.3, speed > 0 ? 2 : -2]} color={speed > 0 ? '#fffae6' : '#ff2222'} intensity={3} distance={15} />
      {/* Taillights */}
      <mesh position={[0.5, 0.2, speed > 0 ? -1.8 : 1.8]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshBasicMaterial color={speed > 0 ? '#ff2222' : '#fffae6'} />
      </mesh>
      <mesh position={[-0.5, 0.2, speed > 0 ? -1.8 : 1.8]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshBasicMaterial color={speed > 0 ? '#ff2222' : '#fffae6'} />
      </mesh>
    </group>
  );
}

function Traffic() {
  const cars = useMemo(() => {
    const arr = [];
    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#a855f7', '#f97316'];
    for (let i = 0; i < 8; i++) {
      const goingForward = Math.random() > 0.5;
      arr.push({
        startZ: -120 + Math.random() * 240,
        speed: goingForward ? (8 + Math.random() * 12) : -(8 + Math.random() * 12),
        lane: goingForward ? (2 + Math.random() * 3) : -(2 + Math.random() * 3),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {cars.map((c, i) => (
        <Car key={i} {...c} />
      ))}
    </group>
  );
}

/* ============================================================
   RAIN PARTICLES — Falling rain with streaks
   ============================================================ */
function Rain() {
  const count = 1500;
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 150;
      pos[i * 3 + 1] = Math.random() * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 250;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= 0.6;
      if (arr[i * 3 + 1] < 0) {
        arr[i * 3 + 1] = 50 + Math.random() * 10;
        arr[i * 3] = (Math.random() - 0.5) * 150;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 250;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#6366f1"
        size={0.08}
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ============================================================
   FLOATING DATA PARTICLES — Glowing orbs in the air
   ============================================================ */
function DataParticles() {
  const count = 600;
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [0.39, 0.4, 0.95], [0.66, 0.33, 0.98],
      [0.02, 0.71, 0.83], [0.93, 0.29, 0.6],
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 140;
      pos[i * 3 + 1] = 1 + Math.random() * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 280;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005;
      const arr = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.003;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ============================================================
   MAIN CITY SCENE
   ============================================================ */
const CityScene = ({ gameState, currentSection }) => {
  return (
    <div className="city-canvas">
      <Canvas
        shadows
        camera={{ position: [0, 50, 95], fov: 50, near: 0.1, far: 600 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#010008']} />
        <fog attach="fog" args={['#010008', 15, 180]} />

        {/* Ambient — soft fill */}
        <ambientLight intensity={0.05} color="#12123a" />

        {/* Moon/Key Light — cinematic */}
        <directionalLight position={[30, 60, 20]} intensity={0.18} color="#6366f1" />
        <directionalLight position={[-20, 40, -30]} intensity={0.1} color="#a855f7" />
        <directionalLight position={[0, 80, 0]} intensity={0.04} color="#ffffff" />

        {/* Road accent lights */}
        <pointLight position={[0, 0.5, 20]} intensity={2.5} distance={55} color="#6366f1" />
        <pointLight position={[0, 0.5, -20]} intensity={2.5} distance={55} color="#a855f7" />
        <pointLight position={[0, 0.5, 60]} intensity={1.5} distance={40} color="#06b6d4" />
        <pointLight position={[0, 0.5, -50]} intensity={1.5} distance={40} color="#ec4899" />

        <CameraRig gameState={gameState} currentSection={currentSection} />

        <Stars radius={180} depth={100} count={5000} factor={5.5} saturation={0.3} fade speed={0.4} />

        <CityBuildings />
        <ReflectiveGround />
        <Road />
        <NeonSigns />
        <StreetLights />
        <Traffic />
        <Rain />
        <DataParticles />
      </Canvas>
    </div>
  );
};

export default CityScene;
