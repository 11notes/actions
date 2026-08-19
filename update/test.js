import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const bundlePath = resolve('./dist/index.js');
if(!existsSync(bundlePath)){
  console.error('build failed, no index.js found!');
  process.exit(1);
}

process.env.DEBUG = true;
process.env.INPUT_LATEST = '1.0.0';
process.env.INPUT_VERBOSE = 'true';
process.env.GITHUB_WORKSPACE = process.cwd();

console.log('testing github action ...');

try{
  await import(bundlePath);
}catch(err){
  console.error('❌ execution error in action:', err);
  process.exit(1);
}