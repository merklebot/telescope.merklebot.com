export default {
  API_SERVER:
    process.env.VUE_APP_API_SERVER ?? "https://checkout.spot-sdk.education",
  STRIPE_KEY: process.env.VUE_APP_STRIPE_KEY ?? "pk_................",
  PRICE_PER_LESSON_CENTS: process.env.VUE_APP_PRICE_PER_LESSON_CENTS ?? 2000,
  ID_ASSET: process.env.VUE_APP_ACCESS_TOKEN_ASSET_ID,
  SUBSTRATE: {
    url: "wss://statemine-rpc.polkadot.io",
    types: {},
    keyring: {
      isDevelopment: false,
      type: "sr25519"
    }
  },
  ACCESS_TOKEN_RECV_ACCOUNT: process.env.VUE_APP_ACCESS_TOKEN_RECV_ACCOUNT
};
