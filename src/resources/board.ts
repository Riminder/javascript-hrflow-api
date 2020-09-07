import Hrflow = require("..");
import defaults from "../defaults";
import { generateURLParams } from "../utils";
import { SourcesOptions } from "../types";
import { httpRequest } from "../http";

export default class Source {
  private hrflow: Hrflow;
  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(board_key: string) {
    return httpRequest(`${defaults.API_URL}/board?key=${board_key}`, { headers: this.hrflow.headers });
  }

  list(options: SourcesOptions) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/boards?${urlParams}`, { headers: this.hrflow.headers });
  }
}