import { ApiPromise, WsProvider } from "@polkadot/api";
import keyring from "@polkadot/ui-keyring";
import {
  web3FromSource,
  web3Accounts,
  web3Enable
} from "@polkadot/extension-dapp";
import { u8aToHex } from "@polkadot/util";
import config from "../config";

let provider = null;
let api = null;

export function getProvider() {
  if (provider) {
    return provider;
  }
  provider = new WsProvider(config.SUBSTRATE.url);
  // provider.on("error", () => {
  //   console.log("err");
  // });
  return provider;
}
export function getApi() {
  if (api) {
    return api;
  }
  throw new Error("Not init");
}
export async function getInstance() {
  if (api) {
    return api;
  }
  api = await ApiPromise.create({
    provider: getProvider(),
    types: config.SUBSTRATE.types
  });
  return api;
}

export async function getExtension() {
  const extensions = await web3Enable("demo");
  if (extensions.length === 0) throw new Error("no extension");
  return extensions[0];
}

let isInitAccounts = false;
export async function initAccounts(api) {
  const timeout = new Promise(resolve => {
    setTimeout(resolve, 300);
  });
  await timeout;
  await getExtension();
  const accounts = await web3Accounts();
  const injectedAccounts = accounts.map(({ address, meta }) => ({
    address,
    meta
  }));
  keyring.loadAll(
    {
      genesisHash: api.genesisHash,
      ss58Format: api.registry.chainSS58,
      ...config.SUBSTRATE.keyring
    },
    injectedAccounts
  );

  isInitAccounts = true;
  return accounts;
}

export function getAccounts(api) {
  if (isInitAccounts) {
    return keyring.getPairs();
  }
  return initAccounts(api);
}

export async function getAccount(api, address) {
  const account = keyring.getPair(address);
  if (account.meta.isInjected) {
    const injected = await web3FromSource(account.meta.source);
    api.setSigner(injected.signer);
    return {
      ...account,
      signMsg: async function(data) {
        return (
          await injected.signer.signRaw({
            address: account.address,
            data: u8aToHex(data),
            type: "bytes"
          })
        ).signature;
      }
    };
  }

  return {
    ...account,
    signMsg: async function(data) {
      return Promise.resolve(u8aToHex(account.sign(data)));
    }
  };
}

export async function signAndSend(account, tx, options = {}) {
  return new Promise((resolve, reject) => {
    tx.signAndSend(
      account.meta.isInjected ? account.address : account,
      options,
      result => {
        if (result.status.isInBlock) {
          result.events.forEach(events => {
            const {
              event: { data, method, section }
            } = events;
            if (section === "system" && method === "ExtrinsicFailed") {
              reject(new Error(data.toString()));
            } else if (section === "system" && method === "ExtrinsicSuccess") {
              resolve({
                block: result.status.asInBlock.toString(),
                tx: tx.hash.toString()
              });
            }
          });
        }
      }
    ).catch(reject);
  });
}

export class Datalog {
  constructor(api) {
    this.api = api;
  }
  maxId() {
    const windowSize = this.api.consts.datalog.windowSize;
    return windowSize.toNumber() - 1;
  }
  async getLastId(address) {
    let id = null;
    let full = false;
    const index = await this.getIndex(address);
    if (index.start != index.end) {
      id = index.end - 1;
      const max = this.maxId();
      if (id < 0) {
        id = max;
      }
      if (index.start > 0 || index.end === max) {
        full = true;
      }
    }
    return { id, full };
  }
  async getIndex(address) {
    const index = await this.api.query.datalog.datalogIndex(address);
    return {
      start: index.start.toNumber(),
      end: index.end.toNumber()
    };
  }
  async readByIndex(address, index) {
    return await this.api.query.datalog.datalogItem([address, index]);
  }
  async read(address, start = 0, end = null) {
    const log = [];
    if (!end) {
      const id = await this.getLastId(address);
      if (id.full) {
        return (await this.read(address, id.id + 1, this.maxId())).concat(
          await this.read(address, 0, id.id)
        );
      } else {
        end = id.id;
      }
    }
    if (end !== null) {
      for (let index = start; index <= end; index++) {
        const data = await this.readByIndex(address, index);
        log.push(data);
      }
    }
    return log;
  }
}
