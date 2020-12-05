import { Console } from 'console';
import path from 'path';

import sharp from 'sharp';

export async function cli() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: sharp input output');
    process.exit(1);
  }

  const input = path.resolve(args[0]);
  const output = path.resolve(args[1]);

  try {
    await sharp(input).toFile(output);
    console.log(`Successfully converted. New file: ${output}`);
  } catch (err) {
    console.error('Conversion failed', err);
    process.exit(1);
  }
}
