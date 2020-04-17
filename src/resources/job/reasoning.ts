import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { OfferOptionIdOrReference } from "../../types";
import { httpRequest } from "../../http";

export default class Reasoning {
  private hrflow: Hrflow;
  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(options: OfferOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/jobs/reasoning?${urlParams}`, { headers: this.hrflow.headers });
  }
}