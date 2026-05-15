import sharp from "sharp";
import toIco from "to-ico";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public/jm logo.png");
const publicDir = join(root, "public");
mkdirSync(publicDir, { recursive: true });

const trimmed = await sharp(src).trim({ threshold: 15 }).toBuffer();
const meta = await sharp(trimmed).metadata();

/** Monograma sin "ESTUDIO" para tamaños pequeños */
const symbolHeight = Math.round(meta.height * 0.62);
const symbol = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: meta.width, height: symbolHeight })
  .toBuffer();

async function squarePng(input, size) {
  return sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toBuffer();
}

const png16 = await squarePng(symbol, 16);
const png32 = await squarePng(symbol, 32);
const png48 = await squarePng(symbol, 48);
const png180 = await squarePng(trimmed, 180);

writeFileSync(join(publicDir, "favicon-16x16.png"), png16);
writeFileSync(join(publicDir, "favicon-32x32.png"), png32);
writeFileSync(join(publicDir, "favicon-48x48.png"), png48);
writeFileSync(join(publicDir, "apple-touch-icon.png"), png180);

const ico = await toIco([png16, png32, png48]);
writeFileSync(join(publicDir, "favicon.ico"), ico);

console.log("Favicons generated in public/ (16, 32, 48, 180)");
