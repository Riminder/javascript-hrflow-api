import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { jobsScoringOptions } from "../../types";
import { httpRequest } from "../../http";

export default class Scoring {
  private hrflow: Hrflow;
  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  list(board_keys: Array<string>, agent_key: string, source_key: string, profile_key: string, options: jobsScoringOptions) {
    options.use_agent =  1;
    const params = {
      ...options,
      board_keys,
      source_key,
      profile_key,
      agent_key,
    }
    const urlParams = generateURLParams(params);
    return httpRequest(`${defaults.API_URL}/jobs/scoring?${urlParams}`, { headers: this.hrflow.headers });
  }
}