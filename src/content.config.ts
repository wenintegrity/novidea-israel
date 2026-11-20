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

// ---------- Pages: src/content/<locale>/<slug>.yaml ----------
// "home" renders at the locale root; every other file renders at /<slug>.
const pages = defineCollection({
  loader: glob({ pattern: '*/*.yaml', base: './src/content/pages' }),
  schema: ({ image }) => {
    const link = z.object({ label: z.string().min(1), href: z.string().min(1) });

    /** A picture with its alt text. Use alt "" only for purely decorative pictures. */
    const picture = z.object({ src: image(), alt: z.string() });

    const surface = z.enum(['light', 'subtle', 'tint', 'navy']);

    // Section blocks (docs/content-model.md → "Blocks")
    /** A video in src/assets/videos/. Without `file`, a "coming soon" placeholder shows instead. */
    const video = z.object({
      /** File name in src/assets/videos/, e.g. "novidea-overview.mp4" (mp4 or webm). */
      file: z
        .string()
        .regex(/^[\w.-]+\.(mp4|webm)$/, 'A file name in src/assets/videos/ ending in .mp4 or .webm')
        .optional(),
      /** The video's accessible name. */
      title: z.string().min(1),
      /** Captions (WebVTT) in src/assets/videos/. Required by WCAG 1.2.2 for any video with speech. */
      captions: z
        .string()
        .regex(/^[\w.-]+\.vtt$/, 'A file name in src/assets/videos/ ending in .vtt')
        .optional(),
      /** Still image shown before playback. */
      poster: image().optional(),
    });

    const textBlock = z
      .object({
        type: z.literal('text'),
        id: z.string().optional(),
        title: z.string().optional(),
        paragraphs: z.array(z.string().min(1)).min(1),
        picture: picture.optional(),
        video: video.optional(),
        surface: surface.default('light'),
      })
      .refine((b) => !(b.picture && b.video), 'A text block takes a picture or a video, not both');

    const featuresBlock = z.object({
      type: z.literal('features'),
      id: z.string().optional(),
      title: z.string().optional(),
      intro: z.string().optional(),
      columns: z.union([z.literal(2), z.literal(3)]).default(3),
      surface: surface.default('light'),
      picture: picture.optional(),
      items: z
        .array(
          z
            .object({
              icon: reference('icons').optional(),
              title: z.string().optional(),
              body: z.string().optional(),
              /** Whole item is upcoming ("בקרוב"). */
              soon: z.boolean().default(false),
              /** Upcoming addition to an available item. */
              soonNote: z.string().optional(),
            })
            .refine((i) => i.title || i.body, 'An item needs a title or a body'),
        )
        .min(1),
    });

    const namesBlock = z.object({
      type: z.literal('names'),
      id: z.string().optional(),
      title: z.string().min(1),
      /** A plain name, or a name with its logo (the name becomes the logo's alt text). */
      names: z
        .array(z.union([z.string().min(1), z.object({ name: z.string().min(1), logo: image() })]))
        .min(1),
      /** Trailing text after the list, e.g. "ועוד". */
      more: z.string().optional(),
      surface: surface.default('subtle'),
    });

    const linksBlock = z.object({
      type: z.literal('links'),
      id: z.string().optional(),
      title: z.string().optional(),
      surface: surface.default('light'),
      items: z
        .array(
          z.object({
            icon: reference('icons').optional(),
            title: z.string().min(1),
            body: z.string().min(1),
            href: z.string().min(1),
          }),
        )
        .min(1),
    });

    /**
     * HubSpot lead form, loaded only after marketing-cookie consent. Without `hubspot`, the block shows
     * a placeholder listing `fields`.
     */
    const leadFormBlock = z.object({
      type: z.literal('leadForm'),
      id: z.string().optional(),
      hubspot: z
        .object({
          portalId: z.string().regex(/^\d+$/),
          formId: z.uuid(),
          region: z.string().regex(/^[a-z]{2}\d$/).default('na1'),
        })
        .optional(),
      fields: z.array(z.string().min(1)).default([]),
    });

    /**
     * Long-form text (legal pages): numbered sections with paragraphs, an optional bullet list and
     * paragraphs after it. Inline links: [label](href); [label](#cookie-settings) opens the cookie settings.
     */
    const proseBlock = z.object({
      type: z.literal('prose'),
      id: z.string().optional(),
      sections: z
        .array(
          z.object({
            title: z.string().min(1),
            paragraphs: z.array(z.string().min(1)).default([]),
            bullets: z.array(z.string().min(1)).default([]),
            after: z.array(z.string().min(1)).default([]),
          }),
        )
        .min(1),
    });

    const block = z.discriminatedUnion('type', [
      textBlock,
      featuresBlock,
      namesBlock,
      linksBlock,
      leadFormBlock,
      proseBlock,
    ]);

    return z.object({
      seo: z.object({
        title: z.string().min(1).max(60),
        description: z.string().min(1).max(155),
      }),
      /** Home only: the big hero with the slanted yellow panel. */
      hero: z
        .object({
          titleStrong: z.string().min(1),
          titleRest: z.string().min(1),
          lead: z.string().min(1),
          primaryCta: link,
          secondaryCta: link.optional(),
          picture: picture.optional(),
        })
        .optional(),
      /** Internal pages: the page header. */
      header: z
        .object({
          title: z.string().min(1),
          intro: z.array(z.string().min(1)).default([]),
          picture: picture.optional(),
        })
        .optional(),
      sections: z.array(block).default([]),
      /** Show the shared lead banner at the bottom (off on the contact page itself). */
      leadCta: z.boolean().default(true),
    });
  },
});

// ---------- Shared content per locale: src/content/shared/<locale>.yaml ----------
const shared = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/shared' }),
  schema: z.object({
    leadCta: z.object({
      title: z.string().min(1),
      body: z.string().min(1),
      button: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    }),
    footerAbout: z.string().min(1),
  }),
});

export const collections = { icons, pages, shared };
