/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 344:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 666:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/asset-relocator-loader */
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: external "node:util"
const external_node_util_namespaceObject = require("node:util");
// EXTERNAL MODULE: ../../../../../../opt/hostedtoolcache/node/24.19.0/x64/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/core
var core = __nccwpck_require__(344);
// EXTERNAL MODULE: ../../../../../../opt/hostedtoolcache/node/24.19.0/x64/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/exec
var exec = __nccwpck_require__(666);
;// CONCATENATED MODULE: ../.src/Eleven.mjs




class Eleven{
  static #instance = null;
  static arguments = [];

  static #debug = false;
  static #config = {
    verbose:false,
  };

  static set(x, v){
    Eleven.#config[x] = v;
    Eleven.debug(`Eleven.set(${x}, ${v})`);
  }

  static get(x){
    return(Eleven.#config[x]);
  }

  static environment(e){
    switch(true){
      case /development|dev/ig.test(e):
        Eleven.#debug = true;
        Eleven.set('debug', true);
        break;
    }
  }

  static debug(){
    if(Eleven.#debug){
      (0,core.info)(Eleven.#argumentsToPrintableString.apply(Eleven, arguments));
    }
  }

  static info(){
    (0,core.info)(Eleven.#argumentsToPrintableString.apply(Eleven, arguments));
  }

  static warning(){
    (0,core.warning)(Eleven.#argumentsToPrintableString.apply(Eleven, arguments));
  }

  static error(){
    (0,core.error)(Eleven.#argumentsToPrintableString.apply(Eleven, arguments));
  }

  static fail(){
    (0,core.setFailed)(Eleven.#argumentsToPrintableString.apply(Eleven, arguments));
  }

  static notice(){
    (0,core.notice)(Eleven.#argumentsToPrintableString.apply(Eleven, arguments));
  }

  static exportVariable(n, v){
    (0,core.exportVariable)(n, `${v}`);
  }

  static getInput(v){
    return((0,core.getInput)(v) || null);
  }

  static async exec(bin, arg=[], stripCRLF=true){
    let stdout = '';
    let stderr = '';

    const options = {
      listeners:{
        stdout:(data) => {
          stdout += data.toString();
        },
        stderr:(data) => {
          stderr += data.toString();
        }
      }
    };

    try{
      await exec.exec.exec(bin, arg, options);
    }catch(e){
      Eleven.warning(`exec [${bin}] exception: ${e}`);
      return(false);
    }
    if(stderr.length > 0){
      Eleven.warning(`exec [${bin}] exited with error: ${stderr}`);
      return(false);
    }
    if(stripCRLF){
      stdout = stdout.replace(/[\r\n]*/g, '');
    }
    return(stdout);
  }

  static getEleven(){
    if(!Eleven.#instance){
      Eleven.arguments = process.argv.slice(2);
      if(Array.isArray(Eleven.arguments) && Eleven.arguments.length > 0 && String(Eleven.arguments[0]).toLowerCase() === 'development'){
        Eleven.#debug = true;
        Eleven.set('debug', true);
      }
      Eleven.#instance = Eleven;
    }
    return(Eleven.#instance);
  }

  static #stdoutms(ms){
    switch(String(ms).length){
      case 0: return('000');
      case 1: return(`00${ms}`);
      case 2: return(`0${ms}`);
      default: return(ms);
    }
  }

  static #argumentsToPrintableString(){
    const a = [];
    const at = `${new Date().toLocaleString('de-CH', {timeZone:'Europe/Zurich'}).split(', ')[1]}.${Eleven.#stdoutms(new Date().getMilliseconds())}`;
    for(const i in arguments){
      a.push([
        at,
        (typeof(arguments[i]) === 'string' || typeof(arguments[i]) === 'number')
          ? arguments[i]
          : (0,external_node_util_namespaceObject.inspect)(arguments[i]
        ,{showHidden:false, depth:null, colors:true}),
      ].join('   '));
    }
    return(a.join("\r\n"));
  }
}

/* harmony default export */ const _src_Eleven = (Eleven.getEleven);
;// CONCATENATED MODULE: external "node:fs"
const external_node_fs_namespaceObject = require("node:fs");
;// CONCATENATED MODULE: external "node:buffer"
const external_node_buffer_namespaceObject = require("node:buffer");
;// CONCATENATED MODULE: ./src/Update.mjs




const Update_Eleven = _src_Eleven();

class Action{
  #etc = {
    json:'./.json',
    prefix:'ACTIONS_UPDATE',
  };
  #json = {};

  inputs = {latest:Update_Eleven.getInput('latest')};

  constructor(){
    Update_Eleven.info('class Action initialized', this.inputs);
    Update_Eleven.exportVariable(this.#etc.prefix, false);
  }

  async run(){
    this.#getCurrentVersion();
    Update_Eleven.info(`latest version is: ${this.inputs.latest}`);
    if(await this.#latestTagExists()){
      Update_Eleven.warning(`latest version exists already as a tag`);
    }else{
      const update = {
        version:this.inputs.latest,
        tag:`${await Update_Eleven.exec('git', ['describe', '--abbrev=0', '--tags', await Update_Eleven.exec('git', ['rev-list', '--tags', '--max-count=1'])])}`.replace('v', ''),
        unraid:this.#json?.unraid || false,
        nobody:this.#json?.nobody || false,
      };
      Update_Eleven.info(`latest version does not exist as a tag yet`);
      Update_Eleven.exportVariable(this.#etc.prefix, true);
      Update_Eleven.exportVariable(`${this.#etc.prefix}_BASE64JSON`, external_node_buffer_namespaceObject.Buffer.from(JSON.stringify(update)).toString('base64'));
      for(const env in update){
        Update_Eleven.exportVariable(`${this.#etc.prefix}_${env}`.toUpperCase(), update[env]);
      }
    }
  }

  #getCurrentVersion(){
    try{
      this.#json = JSON.parse((0,external_node_fs_namespaceObject.readFileSync)(this.#etc.json).toString());
      Update_Eleven.info(`current version is: ${this.#json.semver.version}`);
      return(this.#json.semver.version);
    }catch(e){
      throw new Error(`could not read/parse ${this.#etc.json}`);
    }
  }

  async #latestTagExists(){
    const response = await fetch(`https://hub.docker.com/v2/repositories/${this.#json.image}/tags/${this.inputs.latest}`);
    Update_Eleven.info(`checking if latest version exists as a tag on docker hub: ${response.ok}`);
    return(response.ok);
  }
}
;// CONCATENATED MODULE: ./index.js


const index_Eleven = _src_Eleven();

process
  .on('unhandledRejection', (reason, p) => {
    index_Eleven.warning('unhandledRejection', reason, p);
  })
  .on('uncaughtException', e => {
    index_Eleven.warning('uncaughtException', e);
  });

(async()=>{
  try{
    const action = new Action();
    await action.run();
  }catch(e){
    index_Eleven.error(e);
  }
})();
})();

module.exports = __webpack_exports__;
/******/ })()
;