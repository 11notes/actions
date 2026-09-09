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
  #inputs = {etc:Eleven.getInput('etc', false)};

  constructor(){
    Eleven.info('class Action initialized', this.#inputs);
  }

  async verify(){
    if(this.#inputs.etc){
      try{
        this.#inputs.etc = JSON.parse(this.#inputs.etc);
      }catch(e){
        this.#inputs.etc = false;
      }
    }
    return(true);
  }

  async run(){
    this.#loadJson();

    let tag = {
      unraid:this.#json?.unraid || false,
      nobody:this.#json?.nobody || false,
    };

    if(this.#inputs.etc){
      tag = {...tag, ...this.#inputs.etc};
    }

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