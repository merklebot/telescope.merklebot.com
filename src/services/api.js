import axios from "axios";
import config from "../config";

export async function checkout(data) {
  const result = await axios.post(`${config.API_SERVER}/checkout`, data);
  return result.data;
}

export async function getStatusKey(account) {
  const result = await axios.get(
    `${config.API_SERVER}/account/status/${account}`
  );
  return result.data.result;
}

export async function setAccount(data) {
  const result = await axios.post(`${config.API_SERVER}/account/send`, data);
  return result.data;
}
