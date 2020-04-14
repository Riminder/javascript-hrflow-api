import Hrflow = require("..");
import defaults from "../defaults";
import { generateURLParams } from "../utils";
import { offersOptions, OfferOptionIdOrReference } from "../types";
import { httpRequest } from "../http";

export default class Offer {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  list(options: offersOptions) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/jobs/searching?${urlParams}`, { headers: this.hrflow.headers });
  }

  parsing(options: OfferOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/job/parsing?${urlParams}`, { headers: this.hrflow.headers });
  }
}