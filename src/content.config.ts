// Collection schemas. Model: docs/content-model.md (owned by the Structure agent).
import { readdirSync, readFileSync } from 'node:fs';
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import YAML from 'yaml';

// ---------- Brand icon library (src/assets/icons/) ----------
// Every <id>.png / <id>.on-dark.png in the folder is an icon. Names and flags come from icons.yaml.
// Adding a file needs a dev-server restart (or `astro sync`) to be picked up.
const ICON_DIR = './src/assets/icons';
const iconCategories = [
  'data',
  'ai',
  'cloud',
  'process',
  'finance',
  'people',
  'business',
  'integration',
  'places',
  'brand',
  'misc',
] as const;

const icons = defineCollection({
  loader: async () => {
    const files = readdirSync(ICON_DIR).filter((f) => f.toLowerCase().endsWith('.png'));
    const ids = [...new Set(files.map((f) => f.replace(/(\.on-dark)?\.png$/i, '')))];
    const meta = (YAML.parse(readFileSync(`${ICON_DIR}/icons.yaml`, 'utf8')) ?? {}) as Record<string, object>;
    return ids.map((id) => ({
      id,
      ...meta[id],
      hasLight: files.includes(`${id}.png`),
      hasDark: files.includes(`${id}.on-dark.png`),
    }));
  },
  schema: z.object({
    en: z.string().optional(),
    he: z.string().optional(),
    category: z.enum(iconCategories).optional(),
    /** Points in the reading direction: mirrored on Hebrew pages (docs/design-system.md §8.1). */
    directional: z.boolean().default(false),
    hasLight: z.boolean(),
    hasDark: z.boolean(),
  }),
});

// ---------- Home page ----------
const home = defineCollection({
  // One file per locale: src/content/he/home.yaml → id "he/home"
  loader: glob({ pattern: '*/home.yaml', base: './src/content' }),
  schema: ({ image }) => {
    const link = z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    });

    const iconItem = z.object({
      icon: reference('icons'),
      title: z.string().min(1),
      body: z.string().min(1),
    });

    /** A picture with its alt text. Alt is required: empty string only for purely decorative pictures. */
    const picture = z.object({
      src: image(),
      alt: z.string(),
    });

    return z.object({
      seo: z.object({
        title: z.string().min(1).max(60),
        description: z.string().min(1).max(155),
      }),
      hero: z.object({
        titleStrong: z.string().min(1),
        titleRest: z.string().min(1),
        lead: z.string().min(1),
        points: z.array(z.string().min(1)).max(4).default([]),
        primaryCta: link,
        secondaryCta: link.optional(),
        picture: picture.optional(),
      }),
      pillars: z.object({
        title: z.string().min(1),
        intro: z.string().optional(),
        items: z.array(iconItem).length(3),
      }),
      results: z.object({
        title: z.string().min(1),
        items: z.array(z.string().min(1)).min(3).max(8),
      }),
      spotlight: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
        points: z.array(z.string().min(1)).min(2).max(5),
        picture: picture.optional(),
      }),
      ai: z.object({
        badge: z.string().optional(),
        title: z.string().min(1),
        body: z.string().min(1),
        items: z.array(iconItem).min(2).max(4),
        picture: picture.optional(),
      }),
      story: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
        points: z.array(z.string().min(1)).min(2).max(4),
        quote: z.object({
          text: z.string().min(1),
          name: z.string().min(1),
          role: z.string().min(1),
        }),
        href: z.string().optional(),
      }),
      audiences: z.object({
        title: z.string().min(1),
        items: z
          .array(
            z.object({
              icon: reference('icons').optional(),
              title: z.string().min(1),
              body: z.string().min(1),
              href: z.string().optional(),
            }),
          )
          .min(2)
          .max(4),
      }),
      customers: z.object({
        title: z.string().min(1),
        stats: z
          .array(z.object({ value: z.string().min(1), label: z.string().min(1) }))
          .min(2)
          .max(4),
        logos: z
          .array(z.object({ name: z.string().min(1), src: z.string().optional() }))
          .max(24)
          .default([]),
      }),
      news: z.object({
        title: z.string().min(1),
        items: z
          .array(
            z.object({
              date: z.coerce.date(),
              title: z.string().min(1),
              summary: z.string().min(1),
              href: z.string().optional(),
            }),
          )
          .min(1)
          .max(3),
      }),
      cta: z.object({
        title: z.string().min(1),
        body: z.string().min(1),
        button: link,
      }),
    });
  },
});

export const collections = { icons, home };
