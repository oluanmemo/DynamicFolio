import { Clapperboard, Code2 } from "lucide-react";

export default function LaneIcon({lane, size = 16, className}: {
  lane: "dev" | "editing";
  size?: number;
  className?: string;
}) {
  const Icon = lane === "dev" ? Code2 : Clapperboard;
  return <Icon size={size} strokeWidth={1.6} className={className} aria-hidden="true" focusable="false" />;
}
