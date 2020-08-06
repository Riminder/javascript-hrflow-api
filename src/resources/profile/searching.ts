import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { profilesSearchingOptions } from "../../types";
import { httpRequest } from "../../http";

export default class Parsing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  list(source_keys: Array<string>, options: profilesSearchingOptions) {
    const params = {
      ...options,
      source_keys,
    }
    const urlParams = generateURLParams(params);
    return httpRequest(`${defaults.API_URL}/profiles/searching?${urlParams}`, { headers: this.hrflow.headers });
  }
}