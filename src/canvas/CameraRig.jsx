import { useRef } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

export default function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isMobile = window.innerWidth <= 600;

    // set initial position
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      targetPosition = isMobile ? [0, 0.2, 2.5] : [0, 0, 2];
    } else {
      targetPosition = isMobile ? [0, 0.2, 2.5] : [0, 0, 2];
    }

    // set camera position
    easing.damp3(state.camera.position, targetPosition, .25, delta);

    // set model rotation
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25);
  });

  return <group ref={group}>{children}</group>;
}
