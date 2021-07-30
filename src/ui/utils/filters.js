export const labelAddress = (text) => {
  return text.slice(0, 6) + "..." + text.slice(-4);
};

export function urlChainExplorer(address, type = "address", chainid = 1) {
  let domain = "etherscan.io";
  if (type === "") {
    type = "address";
  }
  let chain = "";
  if (chainid === 4) {
    chain = "rinkeby.";
  }
  domain = chain + domain;
  return `https://${domain}/${type}/${address}`;
}

export function urlIpfsExplorer(hash, type = "ipfs") {
  const domain = "ipfs.io";
  if (type === "") {
    type = "ipfs";
  }
  return `https://${domain}/${type}/${hash}`;
}
