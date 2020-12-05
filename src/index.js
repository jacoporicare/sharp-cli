import { Console } from 'console';
import path from 'path';

import arg from 'arg';
import sharp from 'sharp';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--lossless': Boolean,
      '-l': '--lossless',
    },
    {
      argv: rawArgs.slice(2),
    },
  );

  return {
    lossless: args['--lossless'] || false,
    input: args._[0],
    output: args._[1],
  };
}

export async function cli(args) {
  const options = parseArgumentsIntoOptions(args);

  if (!options.input || !options.output) {
    console.error('Usage: sharp [-l | --lossless] input output');
    process.exit(1);
  }

  const input = path.resolve(options.input);
  const output = path.resolve(options.output);
  const ext = path.extname(options.output);

  try {
    let s = sharp(input);

    if (ext === '.webp' && options.lossless) {
      s = s.webp({ lossless: true });
    }

    await s.toFile(output);
    console.log(`Successfully converted. New file: ${output}`);
  } catch (err) {
    console.error('Conversion failed', err);
    process.exit(1);
  }
}
