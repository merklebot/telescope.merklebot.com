import axios from "axios";
import config from "../config";

const client = axios.create({
  baseURL: config.API_SERVER,
  headers: {
    'X-App-Info': `version=${config.APP_INFO.VERSION}; commit=${config.APP_INFO.COMMIT_HASH}`,
  },
})

export async function checkout(data) {
  const result = await client.post('checkout', data);
  return result.data;
}

export async function setAccount(data) {
  try {
    await client.post(
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

// export async function telescopeIsFree() {
//   const resp = await axios.get("https://api.merklebot.com/beyond-the-sky/telescopes/{telescope_id}/is_free")
//   return { "isFree": resp.data }
// }

/**
 * Service status update long-polling. Be careful awaitng that while it may take up to 10 minutes by default.
 *
 * @export
 * @param {string} [status_known=null]
 * @param {string} [message_known=null]
 * @param {number} [timeout=600]
 * @return {*}
 */
export async function readServiceStatus(status_known = null, message_known = null, timeout = 600 * 1000) {
  timeout = timeout / 1000 // ms to seconds
  const resp = await client.get('status/update', {
    params: {
      status_known,
      message_known,
      timeout,
    }
  })
  return resp.data
}

export async function readAstronomicalObjectsList(timeout = 0) {
  timeout = timeout / 1000 // ms to seconds
  const resp = await client.get('catalogs/beyond-the-sky', {
    params: {
      timeout,
    },
    headers: {
      'Prefer': `wait=${timeout}`
    }
  })
  return resp.data
}

export async function readIsTelescopeFree(timeout = 0, known_is_free) {
  timeout = timeout / 1000 // ms to seconds
  const resp = await client.get('telescopes/1/is_free', {
    params: {
      known_is_free,
    },
    headers: {
      'Prefer': `wait=${timeout}`,
    },
  })
  return resp.data
}

export async function pricePerNFT() {
  const resp = await client.get('price')
  return resp.data
}

export async function createNFT(name, owner) {
  const resp = await client.get('nft', {
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
  const resp = await client.post('nft/orders', {
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