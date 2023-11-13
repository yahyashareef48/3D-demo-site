import { useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export default function Car() {

  const snap = useSnapshot(state);

  const car = useGLTF("/mclaren_f1/scene.gltf");

  car.scene.traverse((node) => {

    if (node.name === "Object_10") {
      useFrame((state, delta) => easing.dampC(node.material.color, snap.color, 0.25, delta));
    }

    if (node.name === "Object_33") {
      node.visible = false // Change 'blue' to any color you want
    }

    if (node.name === "Object_14") {
      node.visible = false // Change 'blue' to any color you want
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={0.8} />
      <primitive object={car.scene} />
    </mesh>
  );
}

// Object_7 = bumper
// Object_9 = mclaren name on doors
// Object_10 = main color
// Object_33 = top logo