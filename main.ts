// news-image-01 R2 entrypoint: copy the composed front page to /output/entry.png.
//
// The image itself is pre-composed (six generated vignettes + PIL-drawn text)
// and shipped as entry.png beside this file. This program only validates the
// file against the competition gate and copies it to the output path, then
// re-reads the copy and proves it is byte-identical. Node 22+, stdlib only.
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_BYTES = 1048576;
const WANT_W = 1024;
const WANT_H = 1024;

function fail(message) {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

function sha256Hex(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function pngSize(bytes) {
  // IHDR chunk: bytes 16..20 = width (BE), 20..24 = height (BE).
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  const outDir = "/output";
  const dest = join(outDir, "entry.png");

  if (!existsSync(source)) fail(`missing ${source}`);
  const bytes = readFileSync(source);
  if (bytes.length > MAX_BYTES) fail(`entry.png is ${bytes.length} bytes, over ${MAX_BYTES}`);
  if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) fail("entry.png is not a PNG");
  const { width, height } = pngSize(bytes);
  if (width !== WANT_W || height !== WANT_H) {
    fail(`entry.png is ${width}x${height}, expected ${WANT_W}x${WANT_H}`);
  }

  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, dest);

  // Round-trip proof: the copy must hash exactly like the source.
  const copied = readFileSync(dest);
  const before = sha256Hex(bytes);
  const after = sha256Hex(copied);
  if (before !== after) fail("round-trip hash mismatch");
  const onDisk = statSync(dest).size;
  if (onDisk !== bytes.length) fail("round-trip size mismatch");

  console.log(`ok: wrote ${dest} (${onDisk} bytes, ${width}x${height}, sha256 ${after})`);
}

main();
