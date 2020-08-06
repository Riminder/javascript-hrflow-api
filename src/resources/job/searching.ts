import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { jobsSearchingOptions } from "../../types";
import { httpRequest } from "../../http";

export default class Searching {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

   get(board_keys: Array<string>, options: jobsSearchingOptions) {
    const params = {
      ...options,
      board_keys,
    }
    const urlParams = generateURLParams(params);
    return httpRequest(`${defaults.API_URL}/jobs/searching?${urlParams}`, { headers: this.hrflow.headers });
  }
}