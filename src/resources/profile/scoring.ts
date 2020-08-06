import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { ProfilesScoringOptions } from "../../types";
import { httpRequest } from "../../http";

export default class Scoring {
  private hrflow: Hrflow;
  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  list( source_keys: Array<string>, board_key: string, job_key: string, options: ProfilesScoringOptions) {
    options.use_agent =  1;
    const params = {
      ...options,
      source_keys,
      board_key,
      job_key,
    }
    const urlParams = generateURLParams(params);
    return httpRequest(`${defaults.API_URL}/profiles/scoring?${urlParams}`, { headers: this.hrflow.headers });
  }
}