import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { jobOptionIdOrReference } from "../../types";
import { httpRequest } from "../../http";

export default class Parsing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(options: jobOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/job/indexing?${urlParams}`, { headers: this.hrflow.headers });
  }
}