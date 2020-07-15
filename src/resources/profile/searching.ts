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

  list(options: profilesSearchingOptions) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profiles/searching?${urlParams}`, { headers: this.hrflow.headers });
  }
}