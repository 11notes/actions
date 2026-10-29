import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

(async()=>{
  const bundlePath = resolve('./dist/index.js');
  if(!existsSync(bundlePath)){
    console.error('build failed, no index.js found!');
    process.exit(1);
  }

  process.env.DEBUG = true;
  process.env.INPUT_LATEST = '1.26.2';
  process.env.INPUT_VERBOSE = 'true';
  process.env.INPUT_FORCE = 'true';
  process.env.INPUT_ETC = '{"build":{"args":{"NGINX_CONFIGURATION":"full"}}}';
  process.env.GITHUB_WORKSPACE = process.cwd();

  await import(bundlePath);
})();