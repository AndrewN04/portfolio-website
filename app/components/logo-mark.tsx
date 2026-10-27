// Four rack units stepped into an A, one per VM colour: about, skills, projects, contact.
const units = [
  { x: 96, y: 32, w: 64, fill: "var(--z0)" },
  { x: 72, y: 84, w: 40, fill: "var(--z1)" },
  { x: 144, y: 84, w: 40, fill: "var(--z1)" },
  { x: 48, y: 136, w: 160, fill: "var(--z2)" },
  { x: 24, y: 188, w: 64, fill: "var(--z3)" },
  { x: 168, y: 188, w: 64, fill: "var(--z3)" },
];

export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size * (208 / 192)} height={size} viewBox="24 32 208 192" aria-hidden="true">
      {units.map((unit) => <rect key={`${unit.x}-${unit.y}`} x={unit.x} y={unit.y} width={unit.w} height={36} rx={6} fill={unit.fill} />)}
    </svg>
  );
}
