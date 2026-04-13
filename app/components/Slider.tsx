import Image from "next/image";

type SliderProps = {
  variant?: "primary" | "secondary";
  mode?: "icon" | "arrow";
  value?: number;
  min?: number;
  max?: number;
  scale?: "linear" | "log";
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
  leftIcon?: string;
  rightIcon?: string;
  markerIcon?: string;
};

const Slider = ({
  variant = "primary",
  mode = "icon",
  value,
  min,
  max,
  scale = "linear",
  label,
  leftLabel,
  rightLabel,
  leftIcon,
  rightIcon,
  markerIcon = "/planet-purple-accent.svg",
}: SliderProps) => {
  const safeValue = value ?? 0;
  const safeMin = min ?? 0;
  const safeMax = max ?? 100;

  //berekening percentage met logaritmische schaal als scale="log"
  const rawPercentage =
    scale === "log" && safeValue > 0 && safeMin > 0 && safeMax > safeMin
      ? ((Math.log10(safeValue) - Math.log10(safeMin)) /
          (Math.log10(safeMax) - Math.log10(safeMin))) *
        100
      : ((safeValue - safeMin) / (safeMax - safeMin)) * 100;

  const percentage = Math.min(100, Math.max(0, rawPercentage));

  if (mode === "arrow") {
    return (
      <div className="w-full">
        {label && <p className="mb-3 text-center text-body-primary">{label}</p>}
        <div className="flex items-center gap-1">
          <span className="shrink-0 text-body-primary">
            {leftLabel ?? safeMin}
          </span>
          <div className="relative flex-1 px-1">
            <div
              className={`relative h-5 overflow-visible rounded-sm border-3 border-border-quaternary bg-slider-${variant}`}
            >
              <div
                className="absolute inset-y-0 w-1 -translate-x-1/2 bg-border-tertiary"
                style={{ left: `${percentage}%` }}
              />
              <Image
                src="/slider-arrow.svg"
                alt="Arrow"
                width={32}
                height={32}
                className="absolute bottom-0 -translate-x-1/2"
                style={{ left: `${percentage}%` }}
              />
            </div>
          </div>
          <span className="shrink-0 text-right text-body-primary">
            {rightLabel ?? safeMax}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {leftIcon && (
          <div className="flex flex-col shrink-0 w-12 justify-center items-center gap-3xs">
            <Image
              src={leftIcon}
              alt=""
              width={40}
              height={40}
              aria-hidden
              className="h-10 w-10 object-contain"
            />
            <span className="text-text-secondary text-5">{leftLabel}</span>
          </div>
        )}
        <div className="relative flex-1">
          <div
            className={`relative h-10 border-2 border-border-tertiary bg-slider-${variant}`}
          >
            <Image
              src={markerIcon}
              alt="Slider icon"
              width={30}
              height={30}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${percentage}%` }}
            />
          </div>
          {label && (
            <span
              className="absolute top-auto mt-2 -translate-x-1/2 text-body-primary text-text-secondary whitespace-nowrap"
              style={{ left: `${percentage}%` }}
            >
              {label}
            </span>
          )}
        </div>
        {rightIcon && (
          <div className="flex flex-col w-12 shrink-0 justify-center items-center gap-3xs">
            <Image
              src={rightIcon}
              alt=""
              width={40}
              height={40}
              aria-hidden
              className="h-10 w-10 object-contain"
            />
            <span className="text-text-secondary text-5">{rightLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
