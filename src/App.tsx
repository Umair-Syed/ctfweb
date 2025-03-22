import { Box, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Terrain } from "./components/Terrain";

export function App() {
  return (
    <>
      {/* Controls HUD */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255, 255, 255, 0.75)",
          fontSize: "13px",
          fontFamily: "monospace",
          userSelect: "none",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            padding: "8px 12px",
            borderRadius: "4px",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          WASD to move | SPACE to jump | SHIFT to run
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas>
        <Environment preset="sunset" background blur={0.8} resolution={256} />
        <ambientLight intensity={1} />
        <directionalLight
          castShadow
          position={[10, 10, 10]}
          intensity={1}
          shadow-mapSize={[4096, 4096]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          shadow-camera-near={1}
          shadow-camera-far={150}
          shadow-bias={-0.0001}
          shadow-normalBias={0.02}
        />
        <Physics
          debug={true}
          timeStep={1 / 60}
          interpolate={true}
          gravity={[0, -9.81, 0]}
        >
          <Terrain
            width={100}
            height={100}
            resolution={64}
            amplitude={5}
            seed={Math.random() * 100}
            color="#4b9e30"
          />
          <RigidBody type="dynamic" colliders="cuboid" position={[0, 15, 0]}>
            <Box args={[1, 1, 1]}>
              <meshStandardMaterial color="orange" />
            </Box>
          </RigidBody>

          <RigidBody type="dynamic" colliders="cuboid" position={[5, 18, 3]}>
            <Box args={[2, 2, 2]}>
              <meshStandardMaterial color="red" />
            </Box>
          </RigidBody>

          <RigidBody type="dynamic" colliders="cuboid" position={[-6, 20, -4]}>
            <Box args={[1.5, 1.5, 1.5]}>
              <meshStandardMaterial color="blue" />
            </Box>
          </RigidBody>

          <RigidBody type="dynamic" colliders="cuboid" position={[3, 22, -7]}>
            <Box args={[1, 2, 1]}>
              <meshStandardMaterial color="purple" />
            </Box>
          </RigidBody>
        </Physics>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
