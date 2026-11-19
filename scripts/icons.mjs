// Prepares and checks the brand icon library in src/assets/icons/. Run: npm run icons
//
// Files:  <id>.png          navy lines, for light backgrounds (white, light grey, yellow, sky, red)
//         <id>.on-dark.png  white lines, for navy backgrounds
//
// For each file it:
//   1. removes a solid white background from <id>.png (keeps anti-aliased edges smooth),
//   2. pads to a square and scales down to 350×350 if larger,
// then reports icons without a twin, missing names in icons.yaml, and invalid file names.
// Safe to run repeatedly: files that are already prepared are left untouched.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import YAML from 'yaml';

const DIR = 'src/assets/icons';
const MAX = 350;
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** White → transparent ("color to alpha"). Solid colors stay solid; only white and edge blends change. */
function removeWhite(data) {
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a === 0) continue;
    const alpha = Math.max(255 - r, 255 - g, 255 - b) / 255; // how far from white
    if (alpha >= 0.8) continue; // solid navy / yellow: keep as is
    if (alpha === 0) {
      data[i + 3] = 0;
      continue;
    }
    for (let c = 0; c < 3; c++) data[i + c] = Math.round((data[i + c] - (1 - alpha) * 255) / alpha);
    data[i + 3] = Math.round(alpha * a);
  }
}

function isOpaqueWhite(data, i) {
  return data[i + 3] > 250 && data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245;
}

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith('.png')).sort();
const errors = [];
const warnings = [];
let prepared = 0;

for (const file of files) {
  const onDark = file.endsWith('.on-dark.png');
  const id = file.replace(/(\.on-dark)?\.png$/i, '');
  if (!ID.test(id)) errors.push(`${file}: use lowercase letters, digits and dashes only (e.g. "cloud-security.png")`);

  const full = path.join(DIR, file);
  const { data, info } = await sharp(await readFile(full)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  let changed = false;

  const corners = [0, (w - 1) * 4, (h - 1) * w * 4, (h * w - 1) * 4];
  if (!onDark && corners.some((i) => isOpaqueWhite(data, i))) {
    removeWhite(data);
    changed = true;
  }

  let image = sharp(data, { raw: { width: w, height: h, channels: 4 } });
  const side = Math.max(w, h);
  if (w !== h || side > MAX) {
    const target = Math.min(side, MAX);
    image = image.resize(target, target, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
    changed = true;
  }

  if (changed) {
    await writeFile(full, await image.png({ compressionLevel: 9 }).toBuffer());
    prepared++;
  }
}

// Pairs and metadata
const ids = [...new Set(files.map((f) => f.replace(/(\.on-dark)?\.png$/i, '')))];
const meta = YAML.parse(await readFile(path.join(DIR, 'icons.yaml'), 'utf8')) ?? {};
for (const id of ids) {
  if (!files.includes(`${id}.png`)) warnings.push(`${id}: no ${id}.png (needed on light backgrounds)`);
  if (!files.includes(`${id}.on-dark.png`)) warnings.push(`${id}: no ${id}.on-dark.png (needed on navy backgrounds)`);
  if (!meta[id]?.he || !meta[id]?.en) warnings.push(`${id}: add "he" and "en" names in icons.yaml`);
}
for (const id of Object.keys(meta)) {
  if (!ids.includes(id)) warnings.push(`icons.yaml lists "${id}" but there is no file for it`);
}

console.log(`${ids.length} icons, ${files.length} files, ${prepared} prepared now.`);
for (const w of warnings) console.warn(`  warning: ${w}`);
for (const e of errors) console.error(`  error: ${e}`);
process.exitCode = errors.length ? 1 : 0;
