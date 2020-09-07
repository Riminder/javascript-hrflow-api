import Hrflow = require("../..");
import defaults from "../../defaults";
import { httpPostRequest } from "../../http";

export default class Revealing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  post(text: string) {
    const payload = { text: text }
    return httpPostRequest(`${defaults.API_URL}/document/revealing`, payload, { headers: this.hrflow.headers });
  }
}