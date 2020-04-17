import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { ProfilesSearchingOptions } from "../../types";
import { httpRequest } from "../../http";

export default class Parsing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(options: ProfilesSearchingOptions) {
    if (options.timestamp_end) {
      if (options.timestamp_end && typeof options.timestamp_end === "object") {
        options.timestamp_end = Math.floor(options.timestamp_end.getTime() / 1000);
      } else {
        options.timestamp_end = Math.floor(options.timestamp_end as number / 1000);
      }
    }
    if (options.timestamp_start) {
      if (options.timestamp_start && typeof options.timestamp_start === "object") {
        options.timestamp_start = Math.floor(options.timestamp_start.getTime() / 1000);
      } else {
        options.timestamp_start = Math.floor(options.timestamp_start as number / 1000);
      }
    }
    const urlParams = generateURLParams(options);

    return httpRequest(`${defaults.API_URL}/profiles/searching?${urlParams}`, { headers: this.hrflow.headers });
  }
}