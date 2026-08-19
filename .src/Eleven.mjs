import { inspect } from 'node:util';
import * as core from '@actions/core';
import * as execAction from '@actions/exec';

class Eleven {
  static #instance = null;
  static args = [];

  static #debug = false;
  static #config = {
    verbose: false,
  };

  static set(x, v) {
    Eleven.#config[x] = v;
    Eleven.debug(`Eleven.set(${x}, ${v})`);
  }

  static get(x) {
    return Eleven.#config[x];
  }

  static environment(e) {
    if (/development|dev/gi.test(e)) {
      Eleven.#debug = true;
      Eleven.set('debug', true);
    }
  }

  static debug(...args) {
    if (Eleven.#debug) {
      core.info(Eleven.#argumentsToPrintableString(...args));
    }
  }

  static info(...args) {
    core.info(Eleven.#argumentsToPrintableString(...args));
  }

  static warning(...args) {
    core.warning(Eleven.#argumentsToPrintableString(...args));
  }

  static error(...args) {
    core.error(Eleven.#argumentsToPrintableString(...args));
  }

  static fail(...args) {
    core.setFailed(Eleven.#argumentsToPrintableString(...args));
  }

  static notice(...args) {
    core.notice(Eleven.#argumentsToPrintableString(...args));
  }

  static exportVariable(n, v) {
    core.exportVariable(n, `${v}`);
  }

  static getInput(v) {
    return core.getInput(v) || null;
  }

  static async exec(bin, arg = [], stripCRLF = true) {
    let stdout = '';
    let stderr = '';

    const options = {
      listeners: {
        stdout: (data) => {
          stdout += data.toString();
        },
        stderr: (data) => {
          stderr += data.toString();
        },
      },
    };

    try {
      await execAction.exec(bin, arg, options);
    } catch (e) {
      Eleven.warning(`exec [${bin}] exception: ${e}`);
      return false;
    }

    if (stderr.length > 0) {
      Eleven.warning(`exec [${bin}] exited with error: ${stderr}`);
      return false;
    }

    if (stripCRLF) {
      stdout = stdout.replace(/[\r\n]*/g, '');
    }
    return stdout;
  }

  static getEleven() {
    if (!Eleven.#instance) {
      Eleven.args = process.argv.slice(2);
      if (
        Array.isArray(Eleven.args) &&
        Eleven.args.length > 0 &&
        String(Eleven.args[0]).toLowerCase() === 'development'
      ) {
        Eleven.#debug = true;
        Eleven.set('debug', true);
      }
      Eleven.#instance = Eleven;
    }
    return Eleven.#instance;
  }

  static #stdoutms(ms) {
    const s = String(ms);
    switch (s.length) {
      case 0: return '000';
      case 1: return `00${s}`;
      case 2: return `0${s}`;
      default: return s;
    }
  }

  static #argumentsToPrintableString(...args) {
    const at = `${new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' }).split(', ')[1]}.${Eleven.#stdoutms(new Date().getMilliseconds())}`;
    return args
      .map((item) => {
        const val = typeof item === 'string' || typeof item === 'number'
          ? item
          : inspect(item, { showHidden: false, depth: null, colors: true });
        return `${at}   ${val}`;
      })
      .join('\r\n');
  }
}

export default Eleven.getEleven;