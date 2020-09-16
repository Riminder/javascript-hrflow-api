import Hrflow = require("../..");
import defaults from "../../defaults";
import { ProfileJSON } from "../../types";
import { httpPostRequest } from "../../http";

export default class Parsing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  post(text: string) {
    const payload = { text: text }
    return httpPostRequest(`${defaults.API_URL}/document/parsing`, payload, { headers: this.hrflow.headers });
  }
}