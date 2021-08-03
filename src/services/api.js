import axios from "axios";
import config from "../config";

export async function checkout(data) {
  const result = await axios.post(`${config.API_SERVER}/checkout`, data);
  return result.data;
}

export async function setAccount(data) {
  try {
    await axios.post(
      `https://api.merklebot.com/spot-sdk-edu/access-credentials/`,
      data
    );
    return { result: true };
  } catch (error) {
    console.log(error);
  }
  return { result: false };
}
