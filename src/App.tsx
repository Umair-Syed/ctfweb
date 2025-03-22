import { Box, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

// Simple component without physics for testing
const SimpleScene = () => {
  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <Box position={[0, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="orange" />
      </Box>
      <gridHelper args={[10, 10]} />
    </>
  );
};

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
          debug={false}
          timeStep={1 / 60}
          interpolate={true}
          gravity={[0, -9.81, 0]}
        >
          <SimpleScene />
        </Physics>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
