const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = path.join(__dirname, '..');
const imgDir = path.join(baseDir, 'assets', 'images');

// 1. Generate 16x16 from favicon-32.png if needed
const p16 = path.join(imgDir, 'favicon-16.png');
const p32 = path.join(imgDir, 'favicon-32.png');
const p48 = path.join(imgDir, 'favicon-48.png');
const p64 = path.join(imgDir, 'favicon-64.png');

try {
  execSync(`sips -z 16 16 "${p32}" --out "${p16}"`);
  execSync(`sips -z 48 48 "${p64}" --out "${p48}"`);
  console.log('Created favicon-16.png and favicon-48.png');
} catch (e) {
  console.error('sips error:', e.message);
}

// 2. Read PNG files: 16, 32, 48, 64
const images = [
  { size: 16, buf: fs.readFileSync(p16) },
  { size: 32, buf: fs.readFileSync(p32) },
  { size: 48, buf: fs.readFileSync(p48) },
  { size: 64, buf: fs.readFileSync(p64) }
];

// Calculate ICO header & directory
const count = images.length;
const headerSize = 6;
const dirEntrySize = 16;
let dataOffset = headerSize + count * dirEntrySize;

const headerBuf = Buffer.alloc(headerSize);
headerBuf.writeUInt16LE(0, 0); // reserved
headerBuf.writeUInt16LE(1, 2); // type 1 = ICO
headerBuf.writeUInt16LE(count, 4); // count

const dirEntries = [];
for (const img of images) {
  const entry = Buffer.alloc(dirEntrySize);
  entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width
  entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(img.buf.length, 8); // size of image data
  entry.writeUInt32LE(dataOffset, 12); // offset
  dataOffset += img.buf.length;
  dirEntries.push(entry);
}

const icoBuf = Buffer.concat([
  headerBuf,
  ...dirEntries,
  ...images.map(img => img.buf)
]);

// Write to root favicon.ico and assets/images/favicon.ico
fs.writeFileSync(path.join(baseDir, 'favicon.ico'), icoBuf);
fs.writeFileSync(path.join(imgDir, 'favicon.ico'), icoBuf);
console.log(`Generated favicon.ico (${icoBuf.length} bytes) to root and assets/images/`);

// Also copy root favicon.png and apple-touch-icon.png
fs.copyFileSync(path.join(imgDir, 'favicon.png'), path.join(baseDir, 'favicon.png'));
fs.copyFileSync(path.join(imgDir, 'apple-touch-icon.png'), path.join(baseDir, 'apple-touch-icon.png'));
console.log('Copied favicon.png and apple-touch-icon.png to root.');
