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
  process.env.INPUT_VERSION = '1.26.2';
  process.env.INPUT_ETC = JSON.stringify({force: true, build:{args:{dashboard_versio:"2.99.9"}}});

  await import(bundlePath);
})();