export default {
  APP_INFO: {
    VERSION:
      require("../package.json").version,
    COMMIT_HASH:
      process.env.VUE_APP_COMMIT_HASH,
  },
  API_SERVER:
    process.env.VUE_APP_API_SERVER,
  API_SERVER_LONG_POLLING_TIMEOUT:
    process.env.VUE_APP_API_SERVER_LONG_POLLING_TIMEOUT_SEC * 1000 ?? 600 * 1000,
  STRIPE_KEY: process.env.VUE_APP_STRIPE_KEY,
  TYPEFORM_ID: process.env.VUE_APP_TYPEFORM_ID,
  PRICE_PER_STRGZN_CENTS: parseInt(process.env.VUE_APP_PRICE_PER_STRGZN_CENTS),
  PRICE_PER_NFT_STRGZNS: parseInt(process.env.VUE_APP_PRICE_PER_NFT_STRGZNS),
  ID_ASSET: process.env.VUE_APP_ACCESS_TOKEN_ASSET_ID,
  SUBSTRATE: {
    url: "wss://statemine-rpc.polkadot.io",
    types: {},
    keyring: {
      isDevelopment: false,
      type: "sr25519"
    }
  },
  ACCESS_TOKEN_RECV_ACCOUNT: process.env.VUE_APP_ACCESS_TOKEN_RECV_ACCOUNT,

  MIN_TOKENS_BUY: 1,
  MAX_TOKENS_BUY: 1000,
};
