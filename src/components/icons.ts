// UI icon set: small 24×24 line icons for interface elements (menu button, checkmarks, arrows),
// drawn with `currentColor` strokes. Content illustrations come from the brand icon library in
// src/assets/icons/ instead (see BrandIcon.astro).

export const iconNames = ['arrow', 'check', 'menu'] as const;

export type IconName = (typeof iconNames)[number];

/** Icons that point in the reading direction and are mirrored in RTL (docs/design-system.md §8.1). */
export const directionalIcons: ReadonlySet<IconName> = new Set<IconName>(['arrow']);

export const iconPaths: Record<IconName, string> = {
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
};
