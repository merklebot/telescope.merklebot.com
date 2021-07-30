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
