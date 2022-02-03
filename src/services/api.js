import axios from "axios";
import config from "../config";

export async function checkout(data) {
  const result = await axios.post(`${config.API_SERVER}/checkout`, data);
  return result.data;
}

export async function setAccount(data) {
  try {
    await axios.post(
      `https://api.merklebot.com/spot-sdk-edu/access-credentials`,
      data
    );
    return { result: true };
  } catch (error) {
    console.log(error);
  }
  return { result: false };
}

// export async function astronomicalObject(){
//   const response = await axios.get(`https://api.merklebot.com/beyond-the-sky/astronomical-objects`)
//   return response.data
// }

// export async function serviceStatus() {
//   const resp = await axios.get("https://api.merklebot.com/beyond-the-sky/status")
//   return { "status": resp.data.status, "message": resp.data.message }
// }

// export async function telescopeIsFree() {
//   const resp = await axios.get("https://api.merklebot.com/beyond-the-sky/telescopes/{telescope_id}/is_free")
//   return { "isFree": resp.data }
// }

export async function pricePerNFT() {
  const resp = await axios.get("https://api.merklebot.com/beyond-the-sky/price")
  return resp.data
}

export async function createNFT(name, owner) {
  const resp = await axios.get("https://api.merklebot.com/beyond-the-sky/nft", {
    params: {
      "name": name,
      "sender": owner,
      "block_number": 0,
      "block_hash": "0x00"
    }
  })
  console.log("Сreate NFT response:", resp)
  return resp
}

export async function createNftOrder(customerAccountAddress, astronmicalObjectCatalogName) {
  const resp = await axios.post(`${config.API_SERVER}/nft/orders`, {
    customer: {
      account_address: customerAccountAddress,
    },
    astronomical_object: {
      catalog_name: astronmicalObjectCatalogName,
    },
  })
  return resp
}

export async function getCustomerEmailByAccountAddress(accountAddress) {
  /* not used now */
  console.log(accountAddress) // delete this when function will be ready
  return "customer@example.com"
}