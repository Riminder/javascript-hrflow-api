import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { ProfileOptionIdOrReference } from "../../types";
import { httpRequest } from "../../http";

export default class Indexing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile/indexing?${urlParams}`, { headers: this.hrflow.headers });
  }
}