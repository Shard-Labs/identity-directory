import axios, { AxiosResponse } from "axios";
import { Identity } from "@/store/state";

export default class HTTPClient {
  static async responseFormatter(response: AxiosResponse){
    const { data: { data, meta, errors } = {}, status, headers } = response;
    return { data, meta: { status, headers, ...meta, errors } };
  }

  static async request(config: object) {
    try {
      return HTTPClient.responseFormatter(await axios.request(config));
    } catch (e) {
      return HTTPClient.responseFormatter(e.response);
    }
  }

  static async get(url: string, config?: object) {
    return HTTPClient.responseFormatter(
      await axios.get(url, {
        ...config,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
    );
  }

  static async post(url: string, data: object, config?: object) {
    return HTTPClient.responseFormatter(await axios.post(url, data, config));
  }

  static async patch(url: string, data: object, config?: object) {
    return HTTPClient.responseFormatter(await axios.patch(url, data, config));
  }

  static async put(url: string, data: object, config?: object) {
    return HTTPClient.responseFormatter(await axios.put(url, data, config));
  }

  static async delete(url: string, config?: object) {
    return HTTPClient.responseFormatter(await axios.delete(url, config));
  }

  static async bulk(requests: [], handler = HTTPClient.responseFormatter) {
    const response = await axios.all(requests);
    return axios.spread(handler)(response);
  }
}
