import getEleven from './Eleven.mjs';
import { readFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';

const Eleven = getEleven();

export default class Action{
  #etc = {
    json:'./.json',
    prefix:'ACTIONS_VERSION',
  };
  #json = {};
  #inputs = {version:Eleven.getInput('version'), etc:Eleven.getInput('etc')};

  constructor(){
    Eleven.info('class Action initialized', this.#inputs);
  }

  async verify(){
    const version = this.#inputs.version;
    if(this.#inputs.etc){
      try{
        this.#inputs.etc = JSON.parse(this.#inputs.etc);
      }catch(e){
        this.#inputs.etc = false;
      }
    }
    return(Boolean(version && version.trim() !== '' && version.toLowerCase() !== 'null'));
  }

  async run(){
    this.#loadJson();

    let version = {
      version:(/^latest$/i.exec(this.#inputs.version)) ? this.#json.semver.version : this.#inputs.version,
      semver:{
        disable:{
          rolling:true
        }
      },
      unraid:this.#json?.unraid || false,
      nobody:this.#json?.nobody || false,
    };

    if(this.#inputs.etc){
      version = {...version, ...this.#inputs.etc};
    }

    Eleven.exportVariable(`${this.#etc.prefix}_BASE64JSON`, Buffer.from(JSON.stringify(version)).toString('base64'));
    for(const env in version){
      Eleven.exportVariable(`${this.#etc.prefix}_${env}`.toUpperCase(), version[env]);
    }
    Eleven.info(version);
  }

  #loadJson(){
    try{
      this.#json = JSON.parse(readFileSync(this.#etc.json).toString());
    }catch(e){
      throw new Error(`could not read/parse ${this.#etc.json}`);
    }
  }
}