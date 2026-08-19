import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const bundlePath = resolve('./dist/index.js');
if(!existsSync(bundlePath)) {
  console.error('build failed, no index.js found!');
  process.exit(1);
}

process.env['INPUT_LATEST'] = '1.0.0';
process.env['INPUT_VERBOSE'] = 'true';
process.env['GITHUB_WORKSPACE'] = process.cwd();

console.log('testing github action ...');

try {
  await import(bundlePath);
  console.log('action executed successfully');
} catch (error) {
  console.error('execution error in action:', error);
  process.exit(1);
}