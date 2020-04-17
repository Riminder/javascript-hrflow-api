import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { offersSearchingOptions } from "../../types";
import { httpRequest } from "../../http";

export default class Searching {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

   get(options: offersSearchingOptions) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/jobs/searching?${urlParams}`, { headers: this.hrflow.headers });
  }
}