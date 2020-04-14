import Hrflow = require("..");
import defaults from "../defaults";
import { FilterIdOrReference } from "../types";
import { generateURLParams } from "../utils";
import { httpRequest } from "../http";

export default class Filter {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(options: FilterIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/filter?${urlParams}`, { headers: this.hrflow.headers });
  }

  list() {
    return httpRequest(`${defaults.API_URL}/filters`, { headers: this.hrflow.headers });
  }
}