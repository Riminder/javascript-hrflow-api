import Hrflow = require("../..");
import defaults from "../../defaults";
import { ProfileJSON } from "../../types";
import { httpPostRequest } from "../../http";

export default class Parsing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  post(item_type: string, data: ProfileJSON, return_sequences: boolean) {
    const payload = {...data, item_type, return_sequences}
    return httpPostRequest(`${defaults.API_URL}/document/parsing`, payload, { headers: this.hrflow.headers });
  }
}