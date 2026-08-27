import getEleven from './Eleven.mjs';
import { readFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';

const Eleven = getEleven();

export default class Action{
  #etc = {
    json:'./.json',
    prefix:'ACTIONS_TAG',
  };
  #json = {};
  #inputs = {};

  constructor(){
    Eleven.info('class Action initialized', this.#inputs);
  }

  async verify(){
    return(true);
  }

  async run(){
    this.#loadJson();

    const tag = {
      unraid:this.#json?.unraid || false,
      nobody:this.#json?.nobody || false,
    };

    Eleven.exportVariable(`${this.#etc.prefix}_BASE64JSON`, Buffer.from(JSON.stringify(tag)).toString('base64'));
    for(const env in tag){
      Eleven.exportVariable(`${this.#etc.prefix}_${env}`.toUpperCase(), tag[env]);
    }
    Eleven.info(tag);
  }

  #loadJson(){
    try{
      this.#json = JSON.parse(readFileSync(this.#etc.json).toString());
    }catch(e){
      throw new Error(`could not read/parse ${this.#etc.json}`);
    }
  }
}