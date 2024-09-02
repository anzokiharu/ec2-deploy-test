import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function optimizeImage(imagePath: string) {
  console.log('Optimizing image:', imagePath);
  const publicDir = path.join(process.cwd(), 'public');
  const inputFilePath = path.join(publicDir, imagePath);

  const isSvg = path.extname(imagePath).toLowerCase() === '.svg';
  const isUrl = imagePath.startsWith('http://') || imagePath.startsWith('https://');
  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`画像ファイルが存在しません: ${imagePath}`);
  }

  if (isSvg || isUrl) {
    return imagePath; // Return original path if SVG or URL
  }
  //const outputDir = path.join(publicDir, 'optimized', path.dirname(imagePath));
  const outputDir = path.join('htdocs', path.dirname(imagePath));

  const outputFilePath = path.join(outputDir, `${path.basename(imagePath, path.extname(imagePath))}.webp`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await sharp(inputFilePath).webp({ quality: 80 }).toFile(outputFilePath);

  return path.join(path.dirname(imagePath), `${path.basename(imagePath, path.extname(imagePath))}.webp`);
}
