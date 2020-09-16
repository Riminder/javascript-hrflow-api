import Hrflow = require("../..");
import defaults from "../../defaults";
import { httpPostRequest } from "../../http";

export default class Linking {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  post(text: string, top_n: number) {
    const payload = { text: text, top_n: top_n }
    return httpPostRequest(`${defaults.API_URL}/document/linking`, payload, { headers: this.hrflow.headers });
  }
}