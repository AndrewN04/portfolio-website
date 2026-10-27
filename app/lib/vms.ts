export const vms = [
  { id: "about", vmid: 100, label: "About", accent: "var(--z0)", hex: 0xf2f1ec },
  { id: "skills", vmid: 101, label: "Skills", accent: "var(--z1)", hex: 0xffb547 },
  { id: "projects", vmid: 102, label: "Projects", accent: "var(--z2)", hex: 0xff7a59 },
  { id: "contact", vmid: 103, label: "Contact", accent: "var(--z3)", hex: 0x7cc4ff },
] as const;

export type Vm = (typeof vms)[number];
export type VmId = Vm["id"];

/** The open window lives in the URL hash, so old #projects and #contact links still land. */
export function vmFromHash(hash: string): VmId | null {
  const id = hash.replace(/^#/, "").toLowerCase();
  return vms.find((vm) => vm.id === id)?.id ?? null;
}
