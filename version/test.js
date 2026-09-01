import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

(async()=>{
  const bundlePath = resolve('./dist/index.js');
  if(!existsSync(bundlePath)){
    console.error('build failed, no index.js found!');
    process.exit(1);
  }

  process.env.DEBUG = true;
  process.env.GITHUB_WORKSPACE = process.cwd();
  process.env.INPUT_VERSION = '1.0.0';

  await import(bundlePath);
})();