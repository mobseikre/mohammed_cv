import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, Suspense } from "react";
import * as THREE from "three";

const ModelLoader = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }

    if (model.name === "Flutter Developer") {
      let meshIndex = 0;
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          // Log mesh names for debugging
          console.log(`Flutter mesh ${meshIndex}: ${child.name}`);

          // Apply Flutter brand colors: blue and white
          // Try swapping - first mesh gets white, second gets blue
          if (meshIndex === 0) {
            // First mesh: white
            child.material = new THREE.MeshStandardMaterial({
              color: "#ffffff",
              metalness: 0.2,
              roughness: 0.3
            });
          } else if (meshIndex === 1) {
            // Second mesh: Flutter blue (#02569B)
            child.material = new THREE.MeshStandardMaterial({
              color: "#02569B",
              metalness: 0.3,
              roughness: 0.4
            });
          } else {
            // Additional meshes (possibly background): make transparent or use blue
            // Check if it's a large background mesh - make it transparent
            const box = new THREE.Box3().setFromObject(child);
            const size = box.getSize(new THREE.Vector3());
            const volume = size.x * size.y * size.z;

            if (volume > 100) {
              // Large mesh, likely background - make transparent
              child.material = new THREE.MeshStandardMaterial({
                transparent: true,
                opacity: 0
              });
            } else {
              // Small mesh, part of logo - use Flutter blue
              child.material = new THREE.MeshStandardMaterial({
                color: "#02569B",
                metalness: 0.3,
                roughness: 0.4
              });
            }
          }
          meshIndex++;
        }
      });
    }

    if (model.name === "C# Developer") {
      let meshIndex = 0;
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          // Log mesh names for debugging
          console.log(`C# mesh ${meshIndex}: ${child.name}`);

          // C# brand colors: light purple background, white C and #, darker purple triangle
          // Based on the model structure: 3 meshes (background, C letter, triangle with #)
          if (meshIndex === 0) {
            // First mesh: light purple background (#A179DC)
            const box = new THREE.Box3().setFromObject(child);
            const size = box.getSize(new THREE.Vector3());
            const volume = size.x * size.y * size.z;

            if (volume > 50) {
              // Large mesh - background (light purple)
              child.material = new THREE.MeshStandardMaterial({
                color: "#A179DC",
                metalness: 0.3,
                roughness: 0.4
              });
            } else {
              // Small mesh - white C or #
              child.material = new THREE.MeshStandardMaterial({
                color: "#ffffff",
                metalness: 0.2,
                roughness: 0.3
              });
            }
          } else if (meshIndex === 1) {
            // Second mesh: white C letter or darker purple triangle
            child.material = new THREE.MeshStandardMaterial({
              color: "#ffffff",
              metalness: 0.2,
              roughness: 0.3
            });
          } else if (meshIndex === 2) {
            // Third mesh: darker purple triangle (#68217A) or white #
            child.material = new THREE.MeshStandardMaterial({
              color: "#68217A",
              metalness: 0.3,
              roughness: 0.4
            });
          } else {
            // Additional meshes: white by default
            child.material = new THREE.MeshStandardMaterial({
              color: "#ffffff",
              metalness: 0.2,
              roughness: 0.3
            });
          }
          meshIndex++;
        }
      });
    }

    if (model.name === "Figma Designer") {
      let meshIndex = 0;
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          // Log mesh names for debugging
          console.log(`Figma mesh ${meshIndex}: ${child.name}, material:`, child.material);

          // Figma brand colors based on mesh order
          const figmaColors = [
            "#000000", // black (background if exists)
            "#F24E1E", // orange/red
            "#1ABCFE", // blue
            "#A259FF", // purple
            "#0ACF83", // green

          ];

          // Apply color based on mesh index
          if (meshIndex < figmaColors.length) {
            child.material = new THREE.MeshStandardMaterial({
              color: figmaColors[meshIndex],
              metalness: 0.2,
              roughness: 0.3
            });
            console.log(`Applied color ${figmaColors[meshIndex]} to mesh ${meshIndex}`);
          }
          meshIndex++;
        }
      });
    }
  }, [scene, model.name]);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={model.scale} rotation={model.rotation} position={model.position || [0, 0, 0]}>
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const TechIconCardExperience = ({ model }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <ModelLoader model={model} />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
