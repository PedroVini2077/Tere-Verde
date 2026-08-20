import { Icon, type IconName } from "@/components/icon";

const GRADIENTS: Record<string, string> = {
  trilha: "from-forest-700 via-forest-600 to-forest-400",
  cachoeira: "from-forest-900 via-forest-700 to-forest-300",
  especie: "from-clay-600 via-clay-500 to-amber-500",
  evento: "from-forest-800 via-forest-600 to-clay-500",
  unidade: "from-forest-950 via-forest-800 to-forest-500",
};

export function MediaPlaceholder({
  kind,
  icon,
  className = "",
}: {
  kind: keyof typeof GRADIENTS;
  icon: IconName;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${GRADIENTS[kind]} ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150 Q40 110 80 140 T160 120 T200 145 V200 H0 Z"
          fill="white"
          opacity="0.35"
        />
        <path
          d="M0 170 Q50 140 100 165 T200 160 V200 H0 Z"
          fill="white"
          opacity="0.25"
        />
      </svg>
      <Icon name={icon} size={30} strokeWidth={1.4} className="relative text-white/85" />
    </div>
  );
}
