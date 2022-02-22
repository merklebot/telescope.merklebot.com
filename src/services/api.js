import axios from "axios";
import config from "../config";

const client = axios.create({
  baseURL: config.API_SERVER,
  headers: {
    'X-App-Info': `version=${config.APP_INFO.VERSION}; commit=${config.APP_INFO.COMMIT_HASH}`
  }
})

export async function checkout(data) {
  const result = await client.post('checkout', data);
  return result.data;
}

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

export async function getTimeNight() {
  const resp = await client.get('tonight')
  return resp.data
}

export async function readOrderById(order_id) {
  const resp = await client.get(`nft/orders/${order_id}`)
  return resp.data
}
