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

  list(options: jobsScoringOptions) {
    options.use_agent = 1;
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/jobs/scoring?${urlParams}`, { headers: this.hrflow.headers });
  }
}