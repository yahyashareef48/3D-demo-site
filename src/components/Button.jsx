import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";

export default function Button({ type, onClick, className, children }) {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    return type === "filled"
      ? { backgroundColor: snap.color, color: getContrastingColor(snap.color) }
      : type === "outline" && { borderColor: snap.color, borderWidth: "1px", color: snap.color };
  };

  return (
    <button
      onClick={onClick}
      className={`px-2 py-1.5 flex-1 rounded-md ${className}`}
      style={generateStyle(type)}
    >
      {children}
    </button>
  );
}
