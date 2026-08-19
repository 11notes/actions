import { readFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import getEleven from './Eleven.mjs';
import semver from 'semver';

const Eleven = getEleven();

export default class Action{
  #etc = {
    json:'./.json',
    prefix:'ACTIONS_UPDATE',
  };
  #json = {};

  inputs = {latest:Eleven.getInput('latest')};

  constructor(){
    Eleven.info('class Action initialized', this.inputs);
    Eleven.exportVariable(this.#etc.prefix, false);
    console.log(this.variableDoesNotExistFail);
    const a = null;
    console.log(a[12]);
  }

  async verify(){
    const input = this.inputs.latest;
    return Boolean(input && input.trim() !== '' && input.toLowerCase() !== 'null');
  }

  async run(){
    this.#getCurrentVersion();
    Eleven.info(`latest version is: ${this.inputs.latest}`);
    if(await this.#latestTagExists()){
      Eleven.warning(`latest version exists already as a tag`);
      Eleven.exportVariable(`${this.#etc.prefix}_EXISTS`, true);
    }else{
      if(semver.gt(this.inputs.latest, this.#json.semver.version)){
        Eleven.info(`latest version does not exist as a tag yet and is higher than existing version, update needed`);
        const update = {
          version:this.inputs.latest,
          tag:`${await Eleven.exec('git', ['describe', '--abbrev=0', '--tags', await Eleven.exec('git', ['rev-list', '--tags', '--max-count=1'])])}`.replace('v', ''),
          unraid:this.#json?.unraid || false,
          nobody:this.#json?.nobody || false,
        };
        Eleven.exportVariable(this.#etc.prefix, true);
        Eleven.exportVariable(`${this.#etc.prefix}_BASE64JSON`, Buffer.from(JSON.stringify(update)).toString('base64'));
        for(const env in update){
          Eleven.exportVariable(`${this.#etc.prefix}_${env}`.toUpperCase(), update[env]);
        }
      }else{
        Eleven.warning(`latest version does not exist as a tag yet but is lower than the existing version, skipping`);
      }
    }
  }

  #getCurrentVersion(){
    try{
      this.#json = JSON.parse(readFileSync(this.#etc.json).toString());
      Eleven.info(`current version is: ${this.#json.semver.version}`);
      return(this.#json.semver.version);
    }catch(e){
      throw new Error(`could not read/parse ${this.#etc.json}`);
    }
  }

  async #latestTagExists(){
    const response = await fetch(`https://hub.docker.com/v2/repositories/${this.#json.image}/tags/${this.inputs.latest}`);
    Eleven.info(`checking if latest version exists as a tag on docker hub: ${response.ok}`);
    return(response.ok);
  }
}