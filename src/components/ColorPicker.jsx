import { useSnapshot } from "valtio";
import state from "../store";
import { SketchPicker } from "react-color";

export default function ColorPicker() {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker color={snap.color} disableAlpha onChange={(c) => state.color = c.hex} />
    </div>
  );
}
