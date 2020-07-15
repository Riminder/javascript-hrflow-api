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

  list(options: ProfilesScoringOptions) {
    options.use_agent =  1;
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profiles/scoring?${urlParams}`, { headers: this.hrflow.headers });
  }
}