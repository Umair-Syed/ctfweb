import React, { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute, Color } from "three";
import { RigidBody } from "@react-three/rapier";
import { Noise } from "noisejs";

type TerrainProps = {
  width?: number;
  height?: number;
  resolution?: number;
  amplitude?: number;
  seed?: number;
  color?: string;
};

export const Terrain: React.FC<TerrainProps> = ({
  width = 100,
  height = 100,
  resolution = 100,
  amplitude = 5,
  seed = 42,
  color = "#4b9e30",
}) => {
  // Initialize noise with seed
  const noise = useMemo(() => {
    const noise = new Noise(seed);
    return noise;
  }, [seed]);

  // Generate terrain geometry
  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const gridSize = resolution;

    const vertices = [];
    const indices = [];
    const uvs = [];
    const colors = [];

    // Base color for the terrain
    const baseColor = new Color(color);
    const darkGreen = new Color("#2d5e1a");
    const lightGreen = new Color("#7fc061");
    const brownish = new Color("#6b5031");

    // Create vertices grid
    for (let z = 0; z < gridSize; z++) {
      for (let x = 0; x < gridSize; x++) {
        // Calculate normalized position
        const nx = x / (gridSize - 1);
        const nz = z / (gridSize - 1);

        // Apply noise to get height
        const frequency = 2;
        let y = 0;

        // Apply multiple octaves of noise
        y += noise.perlin2(nx * frequency, nz * frequency) * amplitude;
        y +=
          noise.perlin2(nx * frequency * 2, nz * frequency * 2) *
          amplitude *
          0.5;
        y +=
          noise.perlin2(nx * frequency * 4, nz * frequency * 4) *
          amplitude *
          0.25;

        // Convert normalized position to world position
        const xPos = (nx - 0.5) * width;
        const zPos = (nz - 0.5) * height;

        vertices.push(xPos, y, zPos);
        uvs.push(nx, nz);

        // Color based on height
        const vertexColor = baseColor.clone();

        // Normalize height value
        const normalizedHeight = (y + amplitude) / (amplitude * 2);

        // Assign colors based on height
        if (normalizedHeight < 0.35) {
          // Low areas - darker green
          vertexColor.lerp(darkGreen, 0.6);
        } else if (normalizedHeight > 0.7) {
          // High areas - brownish
          vertexColor.lerp(brownish, (normalizedHeight - 0.7) * 2);
        } else if (normalizedHeight > 0.5) {
          // Medium-high areas - lighter green
          vertexColor.lerp(lightGreen, (normalizedHeight - 0.5) * 2);
        }

        colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
      }
    }

    // Create triangle indices
    for (let z = 0; z < gridSize - 1; z++) {
      for (let x = 0; x < gridSize - 1; x++) {
        const a = z * gridSize + x;
        const b = z * gridSize + x + 1;
        const c = (z + 1) * gridSize + x;
        const d = (z + 1) * gridSize + x + 1;

        // First triangle
        indices.push(a, c, b);
        // Second triangle
        indices.push(b, c, d);
      }
    }

    geo.setIndex(indices);
    geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    geo.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    return geo;
  }, [width, height, resolution, amplitude, noise, color]);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color="#ffffff"
          vertexColors
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </RigidBody>
  );
};

export default Terrain;
