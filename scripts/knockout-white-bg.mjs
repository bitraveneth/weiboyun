/**
 * Remove near-white backgrounds via edge flood-fill, then write WebP with alpha.
 * Preserves interior white (e.g. gift box faces) that aren't connected to edges.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");

const JOBS = [
  ...[
    "model-gift",
    "model-duration",
    "model-contract",
    "model-berth",
    "model-share",
    "model-cloudhost",
    "model-recover",
    "model-maintain",
    "model-sales",
  ].map((name) => ({
    src: path.join(PUBLIC, `${name}.png`),
    out: path.join(PUBLIC, `${name}.webp`),
    maxSize: 512,
    threshold: 245,
  })),
  {
    src: path.join(PUBLIC, "who-car-3d.png"),
    out: path.join(PUBLIC, "who-car-3d.webp"),
    maxSize: 720,
    threshold: 245,
  },
];

function isNearWhite(r, g, b, threshold) {
  return r >= threshold && g >= threshold && b >= threshold;
}

function removeBackground(rgba, width, height, threshold) {
  const data = Buffer.from(rgba);
  const visited = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (visited[i]) return;
    const o = i * 4;
    if (!isNearWhite(data[o], data[o + 1], data[o + 2], threshold)) return;
    visited[i] = 1;
    queue.push(i);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const i = queue.pop();
    const x = i % width;
    const y = (i / width) | 0;
    const o = i * 4;
    data[o + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Soften fringe: any near-white pixel adjacent to transparent becomes soft alpha
  const out = Buffer.from(data);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const o = i * 4;
      if (data[o + 3] === 0) continue;
      if (!isNearWhite(data[o], data[o + 1], data[o + 2], threshold - 12)) continue;
      let touch = false;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const n = (y + dy) * width + (x + dx);
        if (data[n * 4 + 3] === 0) {
          touch = true;
          break;
        }
      }
      if (touch) out[o + 3] = 0;
    }
  }

  return out;
}

async function processJob(job) {
  if (!fs.existsSync(job.src)) {
    console.warn("skip missing", job.src);
    return;
  }

  const base = sharp(job.src).ensureAlpha();
  const meta = await base.metadata();
  const scale =
    Math.max(meta.width || 1, meta.height || 1) > job.maxSize
      ? job.maxSize / Math.max(meta.width || 1, meta.height || 1)
      : 1;
  const width = Math.round((meta.width || 1) * scale);
  const height = Math.round((meta.height || 1) * scale);

  const { data, info } = await sharp(job.src)
    .ensureAlpha()
    .resize(width, height, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = removeBackground(
    data,
    info.width,
    info.height,
    job.threshold
  );

  await sharp(cleaned, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(job.out);

  const outMeta = await sharp(job.out).metadata();
  console.log(
    "ok",
    path.basename(job.out),
    `${outMeta.width}x${outMeta.height}`,
    `alpha=${outMeta.hasAlpha}`,
    `${Math.round(fs.statSync(job.out).size / 1024)}kb`
  );
}

for (const job of JOBS) {
  await processJob(job);
}
