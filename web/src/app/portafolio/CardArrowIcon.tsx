"use client";

const PATH_RIGHT = "M5 12h14M13 6l6 6-6 6";
const PATH_LEFT = "M19 12H5M11 6l-6 6 6 6";

type CardArrowIconProps = {
  className?: string;
  /** `left` = flecha hacia atrás (←); `right` = avanzar (→). */
  direction?: "left" | "right";
};

export function CardArrowIcon({
  className,
  direction = "right",
}: CardArrowIconProps) {
  const d = direction === "left" ? PATH_LEFT : PATH_RIGHT;
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
