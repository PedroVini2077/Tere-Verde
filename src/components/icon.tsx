const paths = {
  home: "M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3.5v-5.5h3V20H17a1 1 0 0 0 1-1v-9",
  trail:
    "M5 20c1-4 1-6-1-9M5 20h4M9 20c1-6-2-8 0-13M9 20h4M13 20c2-3 0-8 3-9 2.5-.8 3 1.5 5 1M18 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  waterfall:
    "M7 3h10M7 3c0 4 2 5 2 8s-2 4-2 8M12 3c0 4 1.5 5 1.5 8S12 15 12 19M17 3c0 4-2 5-2 8s2 4 2 8",
  leaf: "M5 20c9 0 14-5 14-15C9 5 5 10 5 19v1Z M5 20c3-4 6-6 10-9",
  calendar:
    "M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9c1-4 4-6 7-6s6 2 7 6",
  logout:
    "M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4M16 17l5-5-5-5M21 12H9",
  menu: "M4 7h16M4 12h16M4 17h16",
  x: "M6 6l12 12M18 6 6 18",
  plus: "M12 5v14M5 12h14",
  edit: "m16.5 3.5 4 4L8 20l-4.5 1L4.5 16 16.5 3.5Z",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13",
  check: "m5 12 5 5L20 7",
  chevronRight: "m9 6 6 6-6 6",
  mapPin:
    "M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  clock: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  ruler:
    "m3 17 14-14 4 4L7 21ZM8 12l1.5 1.5M11.5 8.5 13 10M15 5l1.5 1.5",
  info: "M12 16v-4M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className,
  size = 20,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
