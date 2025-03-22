import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

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
    <div style={{ width: "100%", height: "100vh", background: "#333" }}>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <Suspense fallback={null}>
          <SimpleScene />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
